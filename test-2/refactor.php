<?php
public function post_confirm(){
  $id = Input::get('service_id');
  $servicio = Service::find($id);
  if($servicio === NULL ){
    return Response::json(array('error' => '1'));
  }
  if($servicio->status_id == '6'){
    return Response::json(array('error' => '2'));
  }
  if(!($servicio->driver_id == NULL && $servicio->status_id == '1')){
    return Response::json(array('error' => '1'));
  }
  $driver_id = Input::get('driver_id');
  $servicio = Service::update($id, array(
              'driver_id' => $driver_id,
              'status_id' => '2'
  ));
  Driver::update($driver_id, array(
    "available" => '0'
  ));
  $driverTmp = Driver::find($driver_id);
  Service::update($id, array(
      'car_id' => $driverTmp->car_id
  ));
  //Notificar a usuario!!
  $servicio = Service::find($id);
  if ($servicio->user->uuid == '') {
    return Response::json(array('error' => '0'));
  }
  $pushMessage = 'Tu servicio ha sido confirmado';
  $push = Push::make();
  if ($servicio->user->type == '1') {//iPhone
    $result = $push->ios(
      $servicio->user->uuid, $pushMessage,
      1,
      'honk.wav',
      'Open',
      array('serviceId' => $servicio->id)
    );
  } else {
    $result = $push->android2(
      $servicio->user->uuid,
      $pushMessage, 1, 'default',
      'Open',
      array('serviceId' => $servicio->id)
    );
  }
  return Response::json($result);
}
