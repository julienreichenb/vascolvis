// Type definitions for colvis-client 2.0.0
// Project: ColVis
// Definitions by: Pierre Vanhulst https://pierre.vanhulst.one

import Vue, { Component, PluginFunction, PluginObject, VueConstructor, DirectiveFunction, DirectiveOptions } from 'vue'
export { DataInputInterface } from './models'
export { GetDataFromContainerOptions, SelectionCoordinates } from './utils'

declare const ColvisPlugin: ColvisPlugin

export default ColvisPlugin

export interface ColvisPlugin {
    install: PluginFunction<ColvisUseOptions>
    version?: string
}

export interface ColvisUseOptions {
    Vuetify: any
}

/**
 * Extending Vue with Colvis' functions
 * ToDo: namespace functions within a $colvis prop
 */
declare module 'vue/types/vue' {
    export interface VueConstructor {
        $getDataFromContainer: any
    }
}

