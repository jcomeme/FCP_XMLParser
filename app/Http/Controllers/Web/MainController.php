<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Library\XMLCore;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\StreamedResponse;

class MainController extends Controller
{
    public function index(Request $request){
        return view('web.index');
    }

    public function importExec(Request $request){

        if(!$request->file('xml')){
            return redirect('/');
        }
        $csv = XMLCore::parseXML($request, 'xml');

        $response = new StreamedResponse(function() use ($request, $csv){
            $stream = fopen('php://output', 'w');
            foreach($csv as $key => $value) {
                fputcsv($stream, $value);
            }
            fclose($stream);
        });
        $filename = 'script'.time().'.csv';
        $response->headers->set('Content-Type', 'text/csv; charset=UTF-8');
        $response->headers->set('Content-Disposition', 'attachment; filename="'.$filename.'"');

        return $response;
    }
}
