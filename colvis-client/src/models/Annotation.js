export default class Annotation {
    subjects;
    complements;
    verb;
    conclusion;
    tags;

    constructor({ subjects, complements, verb, conclusion, tags }) {
        this.subjects = subjects;
        this.complements = complements;
        this.verb = verb;
        this.conclusion = conclusion;
        this.tags = tags;
    }
}
