import axios from 'axios'
const a: number = 123
let list: number[] = []
let liststrnum: number|string[]

list = [1, 2]
liststrnum = ['cc']

// let unde: undefined = undefined
console.log(a, list, axios, liststrnum)

let tuple: [number, string]
tuple = [1, 'abc']
// tuple[0].split('')
tuple[1].split('')

enum Roles {
    ADMIN,
    USER,
    VIP,
}
const admin = Roles.ADMIN
console.log(admin)

const key1: unique symbol = Symbol()
const key2: symbol = Symbol()
const obj1 = {
    [key1]: 'a',
    [key2]: 'b',
}
// console.log(obj1[key2])
console.log(obj1[key1])

enum en {
    error = 1,
    fail = 2,
    c = 1,
}

console.log('enum', en.error)
console.log('enum', en.c)
console.log('enum', en[1])

const getArray = <T>(value: T, times: number = 2): T[] => {
    return new Array(times).fill(value)
}

const arr = getArray<number[]>([1, 2], 3)
console.log(arr)

// const getLength = <T>(param: T): number => {
//     return param.length
// }

class Parent {
    protected age: number
    constructor(age: number) {
        this.age = age
    }
    protected getAge() {
        return this.age
    }
}

class Child extends Parent {
    constructor(age: number) {
        super(age)
    }
    public get() {
        return this.getAge()
    }
}

const s = new Child(9)
console.log(s.get())

interface IInfo {
    age: number
}

type ReadonlyType<T> = {readonly [P in keyof T]: T[P]}
type ReadonlyInfo = ReadonlyType<IInfo>
const info: ReadonlyInfo = {
    age: 14,
}
// info.age = 4

enum Anim {
    Dog = 1,
}
interface IDog {
    type: Anim.Dog,
}
const dog: IDog = {type: 1}

const c = 1

console.log(info, dog, c)

// function cc(best: c): c {
//     return best
// }

const h1 = document.createElement('h1')
h1.innerHTML = 'hello typescript'
document.body.appendChild(h1)
