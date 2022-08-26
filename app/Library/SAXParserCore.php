<?php

namespace App\Library;

use Prewk\XmlStreamer;

class SAXParserCore{


    public $parser = null;

    public $result = [];

    public $status = '';
    public $tempName = '';
    public $tempStart = 0;
    public $serifStatus = false;
    public $inEffect = false;
    public $inName = false;

    // Called to this function when tags are opened
    public function startElements($parser, $name, $attrs)
    {
        if (!empty($name)) {
            if ($name == 'TRANSITIONITEM') {
                //echo 'trans'.PHP_EOL;
                $this->status = 'trans';
            }
            if ($name == 'CLIPITEM'){
                //echo 'clip'.PHP_EOL;
                $this->status = 'clip';
            }
            if ($name == 'START'){
                //echo 'start'.PHP_EOL;
                $this->status = 'start';
            }
            if ($name == 'END'){
                //echo 'end'.PHP_EOL;
                $this->status = 'end';
            }
            if ($name == 'NAME'){
                //echo 'name'.PHP_EOL;
                $this->status = 'name';
            }
            if ($name == 'EFFECT'){
                //echo 'name'.PHP_EOL;
                $this->inEffect = true;
            }
        }
    }

    // Called to this function when tags are closed
    public function endElements($parser, $name)
    {
        if (!empty($name)) {
            if ($name == 'TRANSITIONITEM') {
                //echo 'trans_end'.PHP_EOL;
            }
            if ($name == 'CLIPITEM'){
                //echo 'clip_end'.PHP_EOL;
            }
            if ($name == 'START'){
                //echo 'start_end'.PHP_EOL;
            }
            if ($name == 'END'){
                //echo 'end_end'.PHP_EOL;
            }
            if ($name == 'NAME'){
                //echo 'name_end'.PHP_EOL;

            }
            if($name == 'EFFECT'){
                $this->inEffect = false;
                $this->tempName = '';
            }
            $this->status = '';
        }
    }

    // Called on the text between the start and end of the tags
    public function characterData($parser, $data)
    {
        if (!empty($data)) {
            if ($this->status == 'start'){
                if($data != '-1'){
                    $this->tempStart = $data;
                }
                //echo $data.'<br>'.PHP_EOL;
            }
            if ($this->status == 'end'){
                if($this->serifStatus){
                    //echo $data.'<br>';

                    $index = count($this->result) - 1;
                    if($index >= 0){
                        $this->result[$index]['end'] = $data;
                    }

                    $this->serifStatus = false;
                }
            }

            if ($this->status == 'name'){
                //echo $data.'<br>'.PHP_EOL;
                if($data == 'ソーステキスト'){
                    $this->result[] = [
                        'start' => $this->tempStart,
                        'end' => 0,
                        'name' => $this->tempName,
                    ];

                    $this->serifStatus = true;
                    //echo $this->tempStart;
                    //echo $this->tempName;
                }else{
                    if ($this->inEffect){
                        $this->tempName .= $data;
                    }
                }
            }

        }
    }

    public function parse($filePath)
    {
        // Creates a new XML parser and returns a resource handle referencing it to be used by the other XML functions.
        $this->parser = xml_parser_create();

        xml_set_object($this->parser, $this);
        xml_set_element_handler($this->parser, "startElements", "endElements");
        xml_set_character_data_handler($this->parser, "characterData");

        // open xml file
        if (!($handle = fopen($filePath, "r"))) {
            die("could not open XML input");
        }

        while ($data = fread($handle, 4096)) {
            xml_parse($this->parser, $data);  // start parsing an xml document
        }

        xml_parser_free($this->parser); // deletes the parser

        return ($this->result);

    }

}

