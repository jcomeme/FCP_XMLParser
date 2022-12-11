<?php

namespace App\Library;

use Illuminate\Http\Request;

class XMLCore
{

    public static function parseXML(Request $request, $key)
    {
        $fileName = (time()) . mt_rand(1, 9999999) . "." . $request->file($key)->guessExtension();//TMPファイル名
        $request->file($key)->move(storage_path() . "/xml", $fileName);
        $filePath = storage_path() . "/xml/" . $fileName;

        $streamer = new SAXParserCore();
        $result = $streamer->parse($filePath);
        unlink($filePath);


        $flameRate = 30;
        $csv = [];

        $translator = new TranslationCore();
        $lang = $translator->lang;
        $arr = [];
        foreach ($lang as $key => $value) {
            $arr[$key] = '';
        }


        $timeArr = [];
        $textArr = [];
        foreach ($result as $item) {
            $start = intval($item['start']);
            $end = intval($item['end']);
            if($start > $end){
                $tmp = $start;
                $start = $end;
                $end = $tmp;
            }
            $sec = floor($start / $flameRate);
            $startStr = floor($sec / 3600) .
                ':' . str_pad(floor(($sec % 3600) / 60), 2, 0, STR_PAD_LEFT) .
                ':' . str_pad($sec % 60, 2, 0, STR_PAD_LEFT) .
                '.' . str_pad(floor(1000 * ($start % $flameRate) / $flameRate), 3, 0, STR_PAD_LEFT);
            $sec = floor($end / $flameRate);
            $endStr = floor($sec / 3600) .
                ':' . str_pad(floor(($sec % 3600) / 60), 2, 0, STR_PAD_LEFT) .
                ':' . str_pad($sec % 60, 2, 0, STR_PAD_LEFT) .
                '.' . str_pad(floor(1000 * ($end % $flameRate) / $flameRate), 3, 0, STR_PAD_LEFT);

            $text = str_replace(array("\r\n", "\r", "\n"), '', $item['name']);

            //$transText = $translator->executeTransrationSingle($text, 'pt');

            //foreach ($arr as $k=>$v) {
            //  $arr[$k] .= $startStr.','.$endStr.PHP_EOL.$transText[$k].PHP_EOL.PHP_EOL;
            //}
            $timeArr[] = ['start' => $startStr, 'end' => $endStr];
            $textArr[] = $text;
        }


        foreach ($lang as $key=>$value) {
            $counter = 0;
            $lcounter = 0;
            while (1) {
                $sliced = array_slice($textArr, $counter * 128, 128);

                if (count($sliced) == 0) {
                    break;
                }
                $r = $translator->executeTransrationMulti($sliced, $key);
                if ($r) {
                    foreach ($r as $i) {
                        $arr[$key] .= $timeArr[$lcounter]['start'] . ',' . $timeArr[$lcounter]['end'] . PHP_EOL . ($i['text']) . PHP_EOL . PHP_EOL;
                        $lcounter++;
                    }
                }else{
                    $arr[$key] .= "なんかエラーでした". PHP_EOL . PHP_EOL;
                }
                $counter++;
            }
        }


        return $arr;

    }

}
