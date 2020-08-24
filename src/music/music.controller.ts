import { Controller, Get, Post, Res, HttpStatus, Body } from '@nestjs/common';
import { Response } from 'express';
import { MusicService } from './music.service';
const puppeteer = require('puppeteer');
const $ = require('cheerio');
const rp = require('request-promise');
const url_music = 'https://chiasenhac.vn/nhac-hot/vietnam.html?playlist='; 

@Controller('music')
export class MusicController {
  constructor(private musicService: MusicService){

  }
  @Get("get_all_music")
  async getAll(@Res() res: Response): Promise<any>{
    this.musicService.create(getDataToday());
    res.status(HttpStatus.OK).json({"today": 'done'});
  //   rp(url_music)
  //   .then(function(html){
  //   //success!
  //   // console.log("1");
  //   const url = [];
  //   for(let i=1; i<21; i++){
  //       url.push(url_music + i);
  //   }
  //   return Promise.all(url.map(function(url){
  //       return getData(url);
  //   }))
  //       // console.log($('.download_item', html).length);
  //       // console.log($('.download_item', html));
  //   }).then(function(data){
  //       console.log(data);
  //       res.status(HttpStatus.OK).json({"today": data});
  //   })
  //   .catch(function(err){
  //      console.log(err);
  //   });
    
  //   return "dsadsd";
   }
   @Get("today_music")
   async findTodayMusics(@Res() res: Response){
      this.musicService.findTodayMusics();
     res.status(HttpStatus.OK).json({"today": this.musicService.findTodayMusics()});
   }
}


function getDataToday(){
 return  rp(url_music)
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
     return data;
    //  res.status(HttpStatus.OK).json({"today": data});
 })
 .catch(function(err){
    console.log(err);
 });
 
 return [];
}



const getData = function(url) {
    return rp(url)
      .then(function(html) {
        var data = html.slice(html.indexOf("sources: [")+ 9,html.indexOf("title:")-2);
        var music = data.slice(data.indexOf(`,{"file": `) + 11, data.indexOf('.mp3') + 4);
        var title_html = ($('.download_item', html)[0].attribs).title
        // var title = data.
        // console.log(music);

        // console.log($('video', html)[8].attribs);
        // return {
        //   name: $('.firstHeading', html).text(),
        //   birthday: $('.bday', html).text(),
        // console.log(($('.download_item', html)[0].attribs).title);
        // };
      return {
        href: music,
        title: title_html.slice(29),
        };
      })
      .catch(function(err) {
        //handle error
        console.log(err)
      });
  };



  