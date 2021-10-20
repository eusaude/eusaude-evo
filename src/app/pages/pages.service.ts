import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Individuo } from '../models/individuo';
import { environment } from 'environments/environment';
import { catchError, map, first } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Cidade } from 'app/models/cidade';
import { Estado } from 'app/models/estado';
import { Documento } from 'app/models/documento';
import { Sexo } from 'app/models/sexo';
import { Genero } from 'app/models/genero';
import { Escolaridade } from 'app/models/escolaridade';
import { Raca } from 'app/models/raca';




@Injectable({
  providedIn: 'root'
})
export class PagesService {

  constructor(private httpClient: HttpClient) { }


  getListIndividuos() {
  }

  getIndividuoById() { }

  getCidadas() {
    return this.httpClient.get<Cidade[]>(environment.serverlists + 'CIDADES')
      .pipe(
        first(),
        map(result => result['content']),
        catchError((errorResp) => {
          let errorMenssage = { message: 'Ocorreu um erro desconhecido!', status: 500 };
          if (errorResp.status >= 500 && errorResp.status <= 599) {
            errorMenssage = { message: 'Internal Server Error', status: errorResp.status };
            return throwError(errorMenssage);
          }
          if (errorResp.status >= 400 && errorResp.status <= 499) {
            errorMenssage = { message: 'Bad Request', status: errorResp.status };
            return throwError(errorMenssage);
          }
          return throwError(errorMenssage);
        })
      );
  }

  getEstados() {
    return this.httpClient.get<Estado[]>(environment.serverlists + 'ESTADOS')
      .pipe(
        first(),
        map(result => result['content']),
        catchError((errorResp) => {
          let errorMenssage = { message: 'Ocorreu um erro desconhecido!', status: 500 };
          if (errorResp.status >= 500 && errorResp.status <= 599) {
            errorMenssage = { message: 'Internal Server Error', status: errorResp.status };
            return throwError(errorMenssage);
          }
          if (errorResp.status >= 400 && errorResp.status <= 499) {
            errorMenssage = { message: 'Bad Request', status: errorResp.status };
            return throwError(errorMenssage);
          }
          return throwError(errorMenssage);
        })
      );
  }

  getListaDocumentos() {
    return this.httpClient.get<Documento[]>(environment.serverlists + 'DOCUMENTOS')
      .pipe(
        first(),
        map(result => result['content']),
        catchError((errorResp) => {
          let errorMenssage = { message: 'Ocorreu um erro desconhecido!', status: 500 };
          if (errorResp.status >= 500 && errorResp.status <= 599) {
            errorMenssage = { message: 'Internal Server Error', status: errorResp.status };
            return throwError(errorMenssage);
          }
          if (errorResp.status >= 400 && errorResp.status <= 499) {
            errorMenssage = { message: 'Bad Request', status: errorResp.status };
            return throwError(errorMenssage);
          }
          return throwError(errorMenssage);
        })
      );
  }

  getListaSexos() {
    return this.httpClient.get<Sexo[]>(environment.serverlists + 'SEXOS')
      .pipe(
        first(),
        map(result => result['content']),
        catchError((errorResp) => {
          let errorMenssage = { message: 'Ocorreu um erro desconhecido!', status: 500 };
          if (errorResp.status >= 500 && errorResp.status <= 599) {
            errorMenssage = { message: 'Internal Server Error', status: errorResp.status };
            return throwError(errorMenssage);
          }
          if (errorResp.status >= 400 && errorResp.status <= 499) {
            errorMenssage = { message: 'Bad Request', status: errorResp.status };
            return throwError(errorMenssage);
          }
          return throwError(errorMenssage);
        })
      );
  }

  getListaGeneros() {
    return this.httpClient.get<Genero[]>(environment.serverlists + 'GENEROS')
      .pipe(
        first(),
        map(result => result['content']),
        catchError((errorResp) => {
          let errorMenssage = { message: 'Ocorreu um erro desconhecido!', status: 500 };
          if (errorResp.status >= 500 && errorResp.status <= 599) {
            errorMenssage = { message: 'Internal Server Error', status: errorResp.status };
            return throwError(errorMenssage);
          }
          if (errorResp.status >= 400 && errorResp.status <= 499) {
            errorMenssage = { message: 'Bad Request', status: errorResp.status };
            return throwError(errorMenssage);
          }
          return throwError(errorMenssage);
        })
      );
  }

  getListaEscolaridades() {
    return this.httpClient.get<Escolaridade[]>(environment.serverlists + 'ESCOLARIDADES')
      .pipe(
        first(),
        map(result => result['content']),
        catchError((errorResp) => {
          let errorMenssage = { message: 'Ocorreu um erro desconhecido!', status: 500 };
          if (errorResp.status >= 500 && errorResp.status <= 599) {
            errorMenssage = { message: 'Internal Server Error', status: errorResp.status };
            return throwError(errorMenssage);
          }
          if (errorResp.status >= 400 && errorResp.status <= 499) {
            errorMenssage = { message: 'Bad Request', status: errorResp.status };
            return throwError(errorMenssage);
          }
          return throwError(errorMenssage);
        })
      );

  }

  getListaRacas() {
    return this.httpClient.get<Raca[]>(environment.serverlists + 'RACAS')
      .pipe(
        first(),
        map(result => result['content']),
        catchError((errorResp) => {
          let errorMenssage = { message: 'Ocorreu um erro desconhecido!', status: 500 };
          if (errorResp.status >= 500 && errorResp.status <= 599) {
            errorMenssage = { message: 'Internal Server Error', status: errorResp.status };
            return throwError(errorMenssage);
          }
          if (errorResp.status >= 400 && errorResp.status <= 499) {
            errorMenssage = { message: 'Bad Request', status: errorResp.status };
            return throwError(errorMenssage);
          }
          return throwError(errorMenssage);
        })
      );
  }

  // To add a new individuo
  addIndividuo(individuo: Individuo): Observable<any> {
    return this.httpClient.post(environment.server + '/cadastra-novo-beneficiario', individuo)
      .pipe(
        catchError((errorResp) => {
          let errorMenssage = { message: 'Ocorreu um erro desconhecido!', status: 500 };
          if (errorResp.status >= 500 && errorResp.status <= 599) {
            errorMenssage = { message: 'Internal Server Error', status: errorResp.status };
            return throwError(errorMenssage);
          }
          if (errorResp.status >= 400 && errorResp.status <= 499) {
            errorMenssage = { message: 'Bad Request', status: errorResp.status };
            return throwError(errorMenssage);
          }
          return throwError(errorMenssage);
        })
      );
  }
}
