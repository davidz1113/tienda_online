export var GLOBAL = {
  url: "http://localhost:8080/tienda/api", //ip de el host pagado
};

/**
 * MEtodo que redirije al usuario si este ya se ha registrado
 */

export function redirijirSiEstaIdentificado(_router) {
  const usuario = JSON.parse(localStorage.getItem("jwt"));
  if (usuario != null) {
    _router.navigate(["principal"]);
    // console.log("redirijir");
  } else {
    _router.navigate(["login"]);
  }
}

export interface ProductoInterface {
  id: number;
  nombre: String;
  precio: number;
  unidades: number;
  url: String;
  bloqueo?: boolean;
  numero?: number;
}
