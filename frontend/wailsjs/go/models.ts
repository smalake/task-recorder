export namespace main {
	
	export class Task {
	    category: number;
	    name: string;
	    start: string;
	    end: string;
	    work: string;
	    file: string;
	
	    static createFrom(source: any = {}) {
	        return new Task(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.category = source["category"];
	        this.name = source["name"];
	        this.start = source["start"];
	        this.end = source["end"];
	        this.work = source["work"];
	        this.file = source["file"];
	    }
	}

}

