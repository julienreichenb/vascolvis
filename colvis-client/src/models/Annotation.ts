import { DataInput } from '.';

export default class Annotation {
    public subjects: DataInput[];
    public complements: DataInput[];
    public verb: string;
    public conclusion: string;
    public tags: string[];

    constructor(
        { subjects, complements, verb, conclusion, tags }:
        { subjects: DataInput[], complements: DataInput[], verb: string, conclusion: string, tags: string[]},
    ) {
        this.subjects = subjects;
        this.complements = complements;
        this.verb = verb;
        this.conclusion = conclusion;
        this.tags = tags;
    }
}
