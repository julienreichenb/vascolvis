<template lang="pug">
    svg.col-input-selector(
        v-if="[1,3].includes(step)"
        ref="selection"
        :style="{ top: `${top + offsetTop}px`, left: `${left}px`, width: `${width}px`, height: `${height}px` }"
        @mousedown="start"
        @mousemove="setRect"
        @mouseup="sendCoordinates"
    )
        rect.col-input-selector__selection(
            :x="selectionX" 
            :y="selectionY" 
            :width="selectionWidth" 
            :height="selectionHeight"
        )
        path.col-input-selector__selected(
            v-for="(el, i) in pathPool" 
            :key="i" 
            :transform="getTransform(el)"
            :d="el.domElement.attributes.d.value"
        )
        circle.col-input-selector__selected(
            v-for="(el, i) in circlePool"
            :key="i"
            :transform="getTransform(el)"
            :cx="el.domElement.attributes.cx.value"
            :cy="el.domElement.attributes.cy.value"
            :r="el.domElement.attributes.r.value"
        )
        rect.col-input-selector__selected(
            v-for="(el, i) in rectPool"
            :key="i"
            :transform="getTransform(el)"
            :x="el.domElement.attributes.x.value"
            :y="el.domElement.attributes.y.value"
            :width="el.domElement.attributes.width.value"
            :height="el.domElement.attributes.height.value"
        )
</template>

<script lang="ts">
import { Vue, Prop, Component, Watch } from 'vue-property-decorator';

import { DataInput } from '@/models';

/**
 * Create a new Selector.
 * Selectors are the visual interface that allows analysts to select data units from their visualizations.
 * @extends Vue
 */
@Component
export default class Selector extends Vue {
    /** A query selector that identifies the visualization's container */
    @Prop({ type: String, required: true }) public vis!: string;
    /** Whether the visualization has been initialized */
    @Prop({ type: Boolean, required: true }) public init!: boolean;
    /** The list of selected subjects */
    @Prop({ type: Array, default: () => [] }) public selectedSubjects!: DataInput[];
    /** The list of selected complements */
    @Prop({ type: Array, default: () => [] }) public selectedComplements!: DataInput[];
    /** The current step of the annotation */
    @Prop({ type: Number, required: true }) public step!: number;
    /**
     * The height in pixels of the padding-top of the container.
     * Useful when the Selector lies within elements with position absolute.
     */
    @Prop({ type: Number, default: 0 }) public offsetTop!: number;

    /** The top position of the Selector, in pixels */
    public top: number = 0;
    /** The left position of the Selector, in pixels */
    public left: number = 0;
    /** The width of the Selector, in pixels */
    public width: number = 0;
    /** The height of the Selector, in pixels */
    public height: number = 0;
    /** Whether the user is currently selecting something in the Selector */
    public selecting: boolean = false;
    /** The 'x' attribute of the rectangular selection */
    public selectionX: number = 0;
    /** The 'y' attribute of the rectangular selection */
    public selectionY: number = 0;
    /** The 'width' attribute of the rectangular selection */
    public selectionWidth: number = 0;
    /** The 'height' attribute of the rectangular selection */
    public selectionHeight: number = 0;
    /** The original 'x' attribute of the rectangular selection. Needed to understand if going backwards. */
    public selectionXOrigin: number = 0;
    /** The original 'y' attribute of the rectangular selection. Needed to understand if going upwards. */
    public selectionYOrigin: number = 0;

    readonly $refs!: {
        /** the Selector's SVG dom element */
        selection: Element;
    };

    /** @returns the list of selected DataInputs, either as subjects or complements. */
    get pool(): DataInput[] {
        return this.step === 1 ? this.selectedSubjects : this.selectedComplements;
    }

    /** @returns the list of paths within the selected DataInputs. */
    get pathPool(): DataInput[] {
        return this.pool.filter((input) => input.domElement.tagName === 'path');
    }

    /** @returns the list of circles within the selected DataInputs. */
    get circlePool(): DataInput[] {
        return this.pool.filter((input) => input.domElement.tagName === 'circle');
    }

    /** @returns the list of rectangles within the selected DataInputs. */
    get rectPool(): DataInput[] {
        return this.pool.filter((input) => input.domElement.tagName === 'rect');
    }

    /**
     * Return the translation value of a given element, based on its transformation matrix.
     * It allows to restore the element's precise position despite potential transformations
     * implied by parents.
     * @param {DataInput} element the element whose translate value is required
     */
    public getTransform(element: DataInput): string {
        if (!(element.domElement instanceof SVGGraphicsElement))
            throw new Error('The selected element is not a SVG element');
        const matrix = element.domElement.getCTM();
        return matrix ? `translate(${matrix.e}, ${matrix.f})` : ``;
    }

    /**
     * Get the position of the container of the visualization.
     * Setting { top, left, width, height } properties of the instance.
     */
    public getPosition(): void {
        const target = document.querySelector(this.vis);
        if (!target) return;

        const { top, left, width, height } = target.getBoundingClientRect();
        Object.assign(this.$data, { top, left, width, height });
    }

    /**
     * Startup function that tracks the move of the mouse over the selector's area.
     * Called on mousedown.
     * Setting { selecting, selectionXOrigin, selectionYOrigin } properties of the instance.
     * @param {MouseEvent} event the mousedown event
     */
    public start(event: MouseEvent): void {
        this.selecting = true;
        const boundingBox = this.$refs.selection.getBoundingClientRect();

        this.selectionXOrigin = this.selectionX = event.clientX - boundingBox.left;
        this.selectionYOrigin = this.selectionY = event.clientY - boundingBox.top;
    }

    /**
     * Compute the coordinates of the selection rectangle.
     * Function called while moving across the selector's area.
     * Setting
     * { selectionX, selectonWidth, selectionXOrigin, selectionY, selectionHeight, selectionYOrigin }
     * properties of the instance.
     * @param {MouseEvent} event the mousemove event
     */
    public setRect(event: MouseEvent): void {
        if (!this.selecting) return;
        const boundingBox = this.$refs.selection.getBoundingClientRect();
        const x = event.clientX - boundingBox.left;
        const y = event.clientY - boundingBox.top;

        if (x > this.selectionXOrigin) this.selectionWidth = x - this.selectionXOrigin;
        else {
            this.selectionX = x;
            this.selectionWidth = this.selectionXOrigin - x;
        }

        if (y > this.selectionYOrigin) this.selectionHeight = y - this.selectionYOrigin;
        else {
            this.selectionY = y;
            this.selectionHeight = this.selectionYOrigin - y;
        }
    }

    /**
     * Reset the selection rectangle's values.
     * Setting { selecting, selectionX, selectionY, selectionWidth, selectionHeight } properties of the instance.
     */
    public reset(): void {
        this.selecting = false;
        this.selectionX = 0;
        this.selectionY = 0;
        this.selectionWidth = 0;
        this.selectionHeight = 0;
    }

    /**
     * Send the coordinates of the rectangle to parents.
     */
    public sendCoordinates(): void {
        const base = this.$refs.selection.getBoundingClientRect();
        this.$emit(
            `${this.step === 1 ? 'subject' : 'complement'}Selection`,
            {
                x: this.selectionX + base.left,
                y: this.selectionY + base.top,
                width: this.selectionWidth,
                height: this.selectionHeight,
            },
        );
        this.reset();
    }

    private mounted() {
        this.getPosition();
    }

    @Watch('init')
    private onInitChanged() {
        if (this.init) this.getPosition();
    }
}
</script>

<style lang="sass">
.col-input-selector
    position: absolute
    background-color: rgba(255, 0, 0, .2)
    &:hover
        cursor: crosshair
    &__selection, &__selected
        fill: rgba(255, 0, 0, .3)
        stroke: red
        mix-blend-mode: multiply
</style>
