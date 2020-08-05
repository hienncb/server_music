import { Controller, Get, Post, Res, HttpStatus, Body } from '@nestjs/common';
import { Response } from 'express';
const puppeteer = require('puppeteer');
const $ = require('cheerio');
const rp = require('request-promise');
const url_music = 'https://chiasenhac.vn/nhac-hot/vietnam.html?playlist='; 

@Controller('music')
export class MusicController {
  @Get("today")
  async getAll(@Res() res: Response): Promise<any>{
    rp(url_music)
    .then(function(html){
    //success!
    // console.log("1");
    const url = [];
    for(let i=1; i<21; i++){
        url.push(url_music + i);
    }
    return Promise.all(url.map(function(url){
        return getData(url);
    }))
        // console.log($('.download_item', html).length);
        // console.log($('.download_item', html));
    }).then(function(data){
        console.log(data);
        res.status(HttpStatus.OK).json(data);
    })
    .catch(function(err){
       console.log(err);
    });
    
    return "dsadsd";
  }
}

const getData = function(url) {
    return rp(url)
      .then(function(html) {
        // return {
        //   name: $('.firstHeading', html).text(),
        //   birthday: $('.bday', html).text(),
        return $('.download_item', html)[1].attribs;
        // };
      })
      .catch(function(err) {
        //handle error
      });
  };

