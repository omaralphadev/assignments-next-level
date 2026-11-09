
function multiplyValue(value: number, multiplier:number = 2): number {
    return value * multiplier;
}



type Input = string | number | boolean;
type Output = string | number;

function processInput(value: Input): Output {
    if(value && typeof value === "string"){
        return value.trim().toLowerCase();
    }else if(value && typeof value === "number"){
        return value * 10;
    }else{
        if(value){
            return "Active";
        }
        return "Inactive"
    }
}



function formatCoordinate(value : readonly [number, number, string]): string {
    return `Location: ${value[2]} (${value[0]}, ${value[1]})`;
}



function concatenateArrays<T>(...arrays: T[][]): T[] {
    return arrays.flat();
}



interface Course {
    title: string;
    students: number;
    isPublished: boolean
}

function getPopularCourses(courses: Course[], minStudents: number): Course[] {
    
    return courses.filter((course)=> {
        return course.isPublished && course.students >= minStudents;
    });

}




function pluckValues<T, K extends keyof T>(items: T[], key: K): T[K][] {

    return items.map(item=> item[key] );

}





class Employee {
    constructor(
        protected name: string,
        private baseSalary: number,
    ){}

    getDetails(){
        return `Employee: ${this.name}, Base Salary: ${this.baseSalary}`
    }

}

class Manager extends Employee {
    constructor(
        name: string,
        baseSalary: number,
        private department: string
    ){
        super(name, baseSalary)
    }

    getRoleInfo(){
        return `Manager of ${this.department}: ${this.name}`
    }
}




async function validateAgeAsync(age: number): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        if (age < 18){
            reject(new Error("Access Denied: Must be 18 or older"));
        }
        setTimeout(()=>{
            resolve("Acess Granted");
        }, 1000)
    });
}




