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
    this.numero$ = this._principalService.obtenerNumero();
    this.numeroSubscribe$ = this.numero$.subscribe(
      numero => this.notificacion = numero
    );
    this.usuario = JSON.parse(localStorage.getItem('usuario'));
  }

  ngOnDestroy(): void {
    this.numeroSubscribe$.unsubscribe();
  }

}
