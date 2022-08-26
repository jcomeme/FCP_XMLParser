<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Library\SAXParserCore;
use App\Library\XMLCore;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\StreamedResponse;

class MainController extends Controller
{
    public function index(Request $request){
        return view('web.index');
    }

    public function importExec(Request $request){
        $cvsList = XMLCore::parseXML($request, 'xml');

        $csv = [];
        foreach ($cvsList as $item) {
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


        $response = new StreamedResponse(function() use ($request, $csv){
            $stream = fopen('php://output', 'w');

            //　文字化け回避
            //stream_filter_prepend($stream,'convert.iconv.utf-8/cp932//TRANSLIT');

            // CSVデータ
            foreach($csv as $key => $value) {
                fputcsv($stream, $value);
            }
            fclose($stream);
        });
        $response->headers->set('Content-Type', 'text/csv; charset=UTF-8');
        $response->headers->set('Content-Disposition', 'attachment; filename="sample.csv"');

        return $response;

        $result = XMLCore::parseXML($request, 'xml');
        //dd($result);
        $csv = '';
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
            $csv .= $startStr . ',' . $endStr . ',' . $text . PHP_EOL;
        }
        $filename = 'script'.time().'.csv';
        return response(($csv))
            ->header('Content-Type', 'text/csv; charset=UTF-8')
            ->header('Content-Disposition', 'attachment; filename="' . $filename . '"');

    }
}
