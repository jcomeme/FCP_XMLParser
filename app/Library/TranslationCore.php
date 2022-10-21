<?php

namespace App\Library;

use Google\Cloud\Translate\V2\TranslateClient;

class TranslationCore
{
    private $api_key = '';
    public $lang = [];

    /*
     * 'ja' => '日本語',
     * 'ar'=>'アラビア語',
     *'it'=>'イタリア語',
     *'id'=>'インドネシア語',
     *'nl'=>'オランダ語',
     *'sv'=>'スウェーデン語',
     *'es'=>'スペイン語',
     *'th'=>'タイ語',
     *'de'=>'ドイツ語',
     *'tr'=>'トルコ語',
     *'fr'=>'フランス語',
     *'vi'=>'ベトナム語',
     *'pt'=>'ポルトガル語',
     *'ms'=>'マレー語',
     *'ru'=>'ロシア語',
     *'en'=>'英語',
     *'zh'=>'中国語簡体',
     *'zh-TW'=>'中国語繁体',
     *'ko'=>'韓国語',
    * */
    public function __construct()
    {
        $this->api_key = config("app.google_api_key");
        $this->lang = [
            'ja' => '日本語',
            'id'=>'インドネシア語',
            'es'=>'スペイン語',
            'th'=>'タイ語',
            'de'=>'ドイツ語',
            'vi'=>'ベトナム語',
            'en'=>'英語',
            'zh'=>'中国語簡体',
            'zh-TW'=>'中国語繁体',
            'ko'=>'韓国語',
        ];
    }

    public function executeTransrationSingle($text, $lang_code)
    {
        $translate = new TranslateClient(['key' => $this->api_key]);
        $rst = [];
        foreach ($this->lang as $key => $value) {
            try {
                $result = $translate->translate(
                    $text,
                    ['target' => $key]
                );

                //\Log::debug(print_r($result, 1));
                $rst[$key] = $result['text'];
            } catch (\Exception $e) {
                $rst[$key] = '';
            }
        }

        return $rst;
    }

    public function executeTransrationMulti($text_list, $lang_code)
    {

        try {
            $translate = new TranslateClient(['key' => $this->api_key]);
            $result = $translate->translateBatch(
                $text_list,
                ['target' => $lang_code]
            );

            //\Log::debug(print_r($result,1));

            return $result;
        } catch (\Exception $e) {
            //dd($e);
            return false;
            // エラー処理
        }
    }


}
