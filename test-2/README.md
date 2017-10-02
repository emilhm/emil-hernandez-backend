Refactorizar codigo
===================
Enumeracion de errores detectados:
-------------
1 - Codigo comentado que no cumple ninguna funcion.
2 - Utilizar repetidas veces Input::get('driver_id').
3 - Líneas de código muy largas.
4 - Las variables $pushMessage y $push fueron seteadas antes de comprobar si $servicio->user->uuid cumplia con las condiciones.
5 - La function siempre devolvia error.
6 - Las detecciones de errores de los valores de entradas esta dispersa.
