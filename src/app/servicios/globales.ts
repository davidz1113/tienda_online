export var GLOBAL = {
    url: 'https://youmarket.000webhostapp.com/backend_tienda/', //ip de el host pagado
}

/**
     * MEtodo que redirije al usuario si este ya se ha registrado
     */

export function redirijirSiEstaIdentificado(_router) {
    const usuario = JSON.parse(localStorage.getItem('usuario'));
    if (usuario != null) {
        _router.navigate(['principal']);
        // console.log("redirijir");
    } else {
        _router.navigate(['login']);
    }
}

export interface ProductoInterface {
    idproducto: number,
    nombre: String,
    precio: number,
    unidades: number,
    urlimagen: String,
    bloqueo?: boolean
}