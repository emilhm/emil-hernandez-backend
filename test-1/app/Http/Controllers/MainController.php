<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class MainController extends Controller
{

  public function matrix(Request $request)
  {
    $tests = $request['tests'];
    if (!isset($tests)){
      return response()->json(['error' => 'data were not provided'], 400);
    }
    if (!is_array($tests)){
      return response()->json(['error' => 'data is not an array'], 400);
    }
    if (count($tests) < 1){
      return response()->json(['error' => 'data array is empty'], 400);
    }

    return $tests;
  }

	/**
	 * @description: update operation handler.
	 * updates (x, y, z) position of the matrix with w.
	 * @param {array} $matrix: reference to the current matrix.
	 * @param {array} $op: array with the current operation values.
	 * @param {integer} $n: matrix sides length.
	 * @return: true or false if operation is valid or invalid, respectively.
	 */
	private function update(& $matrix, $op, $n) {
    // current operation error handling
    if (count($op) !== 5)
      return false;
    for($i = 1; $i < 5; $i++)
      if (!is_numeric($op[$i]) || ($op[$i] < 1 && $i !== 4) || $op[$i] != round($op[$i]) || ($op[$i] > $n && $i !== 4)) {
        return false;
    }
		// current operation
  	$matrix[$op[1]-1][$op[2]-1][$op[3]-1] = $op[4];
    return true;
  }
	/**
	 * @description: query operation handler.
	 * adds every position content within (x1, y1, z1) and (x2, y2, z2).
	 * @param {array} $matrix: value of the current matrix.
	 * @param {array} $op: array with the current operation values.
	 * @param {integer} $n: matrix sides length.
	 * @param {array} $queries: reference to the current testcase query
	 * operations results array.
	 * @return: true or false if operation is valid or invalid, respectively.
	 */
	private function query($matrix, $op, $n, & $queries) {
    // current operation error handling
    if (count($op) !== 7)
      return false;
    for($i = 1; $i < 7; $i++) {
      if (!is_numeric($op[$i]) || $op[$i] < 1 || $op[$i] != round($op[$i]) || $op[$i] > $n)
        return false;
    }
		// current operation
  	$q = 0;
  	for($i = $op[1]-1; $i < $op[4]; $i++) {
  		for($j = $op[2]-1; $j < $op[5]; $j++) {
  			for($k = $op[3]-1; $k < $op[6]; $k++) {
  				$q += $matrix[$i][$j][$k];
  			}
  		}
  	}
  	$queries[] = $q;
    return true;
  }
}
