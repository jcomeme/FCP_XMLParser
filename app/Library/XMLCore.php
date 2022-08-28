<?php

namespace App\Library;

use Illuminate\Http\Request;

class XMLCore
{

    public static function parseXML(Request $request, $key){
        $fileName =  (time()).mt_rand(1, 9999999).".".$request->file($key)->guessExtension();//TMPファイル名
        $request->file($key)->move(storage_path()."/xml", $fileName);
        $filePath = storage_path()."/xml/".$fileName;

        $streamer = new SAXParserCore();
        $result = $streamer->parse($filePath);
        unlink($filePath);


        $flameRate = 30;
        $csv = [];
        $str = '';
        foreach ($result as $item) {
            $start = intval($item['start']);
            $end = intval($item['end']);
            $sec = floor($start / $flameRate);
            $startStr = floor($sec / 3600).
                ':'.str_pad(floor(($sec % 3600) / 60), 2, 0, STR_PAD_LEFT).
                ':'.str_pad($sec % 60, 2, 0, STR_PAD_LEFT).
                '.'.str_pad(floor(1000 * ($start % $flameRate) / $flameRate), 3, 0, STR_PAD_LEFT);
            $sec = floor($end / $flameRate);
            $endStr = floor($sec / 3600).
                ':'.str_pad(floor(($sec % 3600) / 60), 2, 0, STR_PAD_LEFT).
                ':'.str_pad($sec % 60, 2, 0, STR_PAD_LEFT).
                '.'.str_pad(floor(1000 * ($end % $flameRate) / $flameRate), 3, 0, STR_PAD_LEFT);

            $text = str_replace(array("\r\n", "\r", "\n"), '', $item['name']);
            $csv[] = [$startStr, $endStr, $text];
            $str .= $startStr.','.$endStr.PHP_EOL.$text.PHP_EOL.PHP_EOL;
        }

        return ($str);
    }

}
