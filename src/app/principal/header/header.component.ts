import { Component, OnInit, OnDestroy } from '@angular/core';
import { PrincipalServices } from '../../servicios/principal.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  notificacion = 0;
  usuario: any = null;
  numero$: Observable<number>;
  numeroSubscribe$: Subscription;
  constructor(private _principalService: PrincipalServices) { }

  ngOnInit() {
    //obtenemos el observador del servicio
    this.numero$ = this._principalService.obtenerNumero();
    //guardamos la subscripcion en otra variable
    this.numeroSubscribe$ = this.numero$.subscribe(
      //asignacion del numero al icono de notificacion
      numero => this.notificacion = numero
    );
    this.usuario = JSON.parse(localStorage.getItem('usuario'));
  }

  ngOnDestroy(): void {
    this.numeroSubscribe$.unsubscribe();
  }

  enviarProductosPrincipal() {
    console.log(this._principalService.obtenerProductosCompra());
  }

}
