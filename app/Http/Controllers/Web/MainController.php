<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Library\XMLCore;
use Faker\Core\File;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
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
        $arr = XMLCore::parseXML($request, 'xml');
        //dd($arr);
        $response = new StreamedResponse(function() use ($arr) {
            $handle = fopen('php://output', 'w');
            foreach ($arr as $row) {
                fputs($handle, $row);
            }
            fclose($handle);
        });
        $time = time();
        $path = storage_path('translate');

        $links = [];

        $save_path = storage_path('app/public/'.$time.'.zip');
        $zip = new \ZipArchive();
        $zip->open($save_path, \ZipArchive::CREATE);
        foreach ($arr as $lang=>$item) {
            $filename = 'script_'.$lang.'.sbv';
            $zip->addFromString($filename, $item);
        }
        $zip->close();

        return response()->download($save_path);

    }
}
