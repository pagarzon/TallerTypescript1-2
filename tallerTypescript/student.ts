export class Student {

    codigo: number;
    cedula: number;
    edad: number;
    direccion: string;
    telefono:number;
  
    constructor(codigo: number, cedula: number, edad:number, direccion:string, telefono:number) {
      this.codigo = codigo;
      this.cedula = cedula;
      this.edad = edad;
      this.direccion = direccion;
      this.telefono = telefono;
    }
  }