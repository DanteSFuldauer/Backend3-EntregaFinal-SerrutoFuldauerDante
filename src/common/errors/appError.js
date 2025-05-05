//Constructor de errores especificos
export class AppError extends Error  { //error es clase padre
  constructor(message, statusCode){
    super(message)
    this.statusCode = statusCode;
  }
}