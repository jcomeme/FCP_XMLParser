<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Library\TranslationCore;
use App\Library\XMLCore;
use Faker\Core\File;
use GPBMetadata\Google\Api\Log;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
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
        $rules = [
            'title' => ['required'],
            'description' => ['required'],
        ];
        $vData = $request->validate($rules);

        $arr = XMLCore::parseXML($request, 'xml', $request->get('flame_rate'));

        $titleDescrption = '';
        $translater = new TranslationCore();
        foreach ($translater->lang as $langCode => $langName){
            $rst = $translater->executeTransrationMulti([$vData['title'], $vData['description']], $langCode);
            $titleDescrption .= $langName.PHP_EOL.PHP_EOL;
            $titleDescrption .= $rst[0]['text'].PHP_EOL.PHP_EOL;
            $titleDescrption .= $rst[1]['text'].PHP_EOL.PHP_EOL.PHP_EOL.PHP_EOL;
        }

        //dd($arr);
        $time = time();


        $save_path = storage_path('app/public/'.Str::random(8).$time.'.zip');
        $zip = new \ZipArchive();
        $zip->open($save_path, \ZipArchive::CREATE);

        foreach ($arr as $lang=>$item) {
            $filename = 'script_'.$lang.'.sbv';
            $zip->addFromString($filename, $item);
        }
        $filename = 'title_and_description.txt';
        $zip->addFromString($filename, $titleDescrption);
        $zip->close();

        return response()->download($save_path);

    }
}
