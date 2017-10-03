<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class MainController extends Controller
{
    public function matrix(Request $request)
    {
        $tests = $request['tests'];
        if (!isset($tests)) {
            return response()->json(['error' => 'data were not provided'], 400);
        }
        if (!is_array($tests)) {
            return response()->json(['error' => 'data is not an array'], 400);
        }
        if (count($tests) < 1) {
            return response()->json(['error' => 'data array is empty'], 400);
        }
        $results = [];
        $operationsQuantity = 0;
        foreach ($tests as $tkey=>$testcase) {
            $matrixLength = $testcase['matrixLength'];
            $operations = $testcase['operations'];
            if (!isset($matrixLength)) {
                return response()->json(
                  ['error' => 'matrixLength was not provided Prueba '.strval($tkey+1)]
                  , 400);
            }
            if (!is_numeric($matrixLength) || $matrixLength < 1 || $matrixLength != round($matrixLength)) {
                return response()->json(
                  ['error' => 'n is not a positive integer Prueba '.strval($tkey+1)]
                  , 400);
            }
            if (!isset($operations)) {
                return response()->json(
                  ['error' => 'operations were not provided Prueba '.strval($tkey+1)]
                  , 400);
            }
            if (!is_array($operations)) {
                return response()->json(
                  ['error' => 'operations is not an array Prueba '.strval($tkey+1)]
                  , 400);
            }
            $matrix = [];
            $results[] = [];
            if (count($operations) < 1) {
                $results[count($results) - 1][] = 'No operations found for testcase '.strval($tkey+1);
                continue;
            }
            for ($i=0; $i < $matrixLength; $i++) {
                $matrix[] = [];
                for ($j=0; $j < $matrixLength; $j++) {
                    $matrix[$i][] = [];
                    for ($k=0; $k < $matrixLength; $k++) {
                        $matrix[$i][$j][] = 0;
                    }
                }
            }
            foreach ($operations as $opkey=>$operation) {
                if (!is_array($operation)) {
                    return response()->json(['error' => 'operation '.strval($opkey+1).' Prueba '.strval($tkey+1).' is not a string'], 400);
                }
                if ($operation[0] === 'Update') {
                    if (!$this->update($matrix, $operation, $matrixLength)) {
                        return response()->json(
                          ['error' => 'wrong format for operation '.strval($opkey+1).' of type UPDATE Prueba '.strval($tkey+1)]
                          , 400);
                    }
                } elseif ($operation[0] === 'Query') {
                    if (!$this->query(
                                $matrix,
                                $operation,
                                $matrixLength,
                                $results[count($results) - 1]
                            )) {
                        return response()->json(
                          ['error' => 'wrong format for operation '.strval($opkey+1).' of type QUERY Prueba '.strval($tkey+1)]
                          , 400);
                    }
                    $operationsQuantity++;
                }
            }
        }
        return response()->json($results);
    }

    /**
     * @description: update operation handler.
     * updates (x, y, z) position of the matrix with w.
     * @param {array} $matrix: reference to the current matrix.
     * @param {array} $op: array with the current operation values.
     * @param {integer} $n: matrix sides length.
     * @return: true or false if operation is valid or invalid, respectively.
     */
    private function update(& $matrix, $op, $n)
    {
        // current operation error handling
        if (count($op) !== 5) {
            return false;
        }
        for ($i = 1; $i < 5; $i++) {
            if (!is_numeric($op[$i]) || ($op[$i] < 1 && $i !== 4) || $op[$i] != round($op[$i]) || ($op[$i] > $n && $i !== 4)) {
                return false;
            }
        }
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
    private function query($matrix, $op, $n, & $results)
    {
        // current operation error handling
        if (count($op) !== 7) {
            return false;
        }
        for ($i = 1; $i < 7; $i++) {
            if (!is_numeric($op[$i]) || $op[$i] < 1 || $op[$i] != round($op[$i]) || $op[$i] > $n) {
                return false;
            }
        }
        // current operation
        $q = 0;
        for ($i = $op[1]-1; $i < $op[4]; $i++) {
            for ($j = $op[2]-1; $j < $op[5]; $j++) {
                for ($k = $op[3]-1; $k < $op[6]; $k++) {
                    $q += $matrix[$i][$j][$k];
                }
            }
        }
        $results[] = $q;
        return true;
    }
}
