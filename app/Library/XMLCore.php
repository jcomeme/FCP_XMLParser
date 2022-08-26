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


        $csv = [];
        foreach ($result as $item) {
            $start = intval($item['start']);
            $end = intval($item['end']);
            $sec = floor($start / 30);
            $startStr = str_pad(floor($sec / 60), 2, 0, STR_PAD_LEFT).
                ':'.str_pad($sec % 60, 2, 0, STR_PAD_LEFT).
                ':'.str_pad(($start % 30), 2, 0, STR_PAD_LEFT);
            $sec = floor($end / 30);
            $endStr = str_pad(floor($sec / 60), 2, 0, STR_PAD_LEFT).
                ':'.str_pad($sec % 60, 2, 0, STR_PAD_LEFT).
                ':'.str_pad(($end % 30), 2, 0, STR_PAD_LEFT);

            $text = str_replace(array("\r\n", "\r", "\n"), '', $item['name']);
            $csv[] = [$startStr, $endStr, $text];
        }

        return $csv;
    }

}
