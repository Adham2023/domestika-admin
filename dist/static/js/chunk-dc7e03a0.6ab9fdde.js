(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-dc7e03a0"],{"0d5c":function(t,e,i){"use strict";i("1f58")},"1f58":function(t,e,i){},"2fe5":function(t,e,i){"use strict";i.r(e);var c=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("el-row",{staticStyle:{height:"calc(100vh - 50px)","overflow-y":"auto"},attrs:{gutter:10}},[i("el-col",{staticStyle:{height:"5rem"},attrs:{span:24}},[i("div",{staticClass:"title-and-tools"},[i("h2",{staticClass:"title"},[t._v(t._s(t.course.courseTitle))]),i("div",{staticClass:"tools"},[i("el-button",{staticStyle:{"font-size":"20px"},attrs:{icon:"el-icon-edit",type:"text"}}),i("el-button",{staticStyle:{"font-size":"20px",color:"red","margin-left":"2rem"},attrs:{icon:"el-icon-delete",type:"text"}})],1)])]),i("el-col",{staticClass:"main-part",staticStyle:{height:"calc(100vh - 50px - 5rem)","overflow-y":"auto"},attrs:{span:15}},[i("mainPart",{ref:"mainPartRef"})],1),i("el-col",{staticStyle:{display:"flex","align-item":"center","flex-flow":"column",height:"calc(100vh - 50px - 5rem)","overflow-y":"auto"},attrs:{span:9}},[i("chapters",{on:{playUnit:function(e){return t.playCurrentUnit()}}})],1)],1)},n=[],s=i("5530"),a=i("2f62"),o=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"mainPart"},[i("div",{staticClass:"chapter-and-unit"},[i("span",{staticClass:"ch-title"},[t._v(t._s(t.current.chapterTitle))]),i("el-divider",{attrs:{direction:"vertical"}}),i("span",{staticClass:"u-title"},[t._v(t._s(t.current.unitTitle))])],1),i("div",{ref:"videoBox",staticStyle:{"max-width":"100%",height:"400px"},attrs:{id:"videoBox"}}),i("div",{staticClass:"descriptions"},[i("el-collapse",[i("el-collapse-item",{attrs:{title:"Unit: ",name:"1"}},[i("div",[t._v(" "+t._s(t.current.unitDescription)+" ")])]),i("el-collapse-item",{attrs:{title:"Chapter: ",name:"2"}},[i("div",[t._v(" "+t._s(t.current.chapterDescription)+" ")])])],1)],1)])},r=[],l={beforeDestroy:function(){console.log("Before destroy main"),this.ifPlayingPause()},computed:Object(s["a"])({},Object(a["e"])("video",["current"])),methods:Object(s["a"])(Object(s["a"])({},Object(a["b"])("video",["getVideoCredentials"])),{},{ifPlayingPause:function(){var t=vdo.getObjects();if(t.length>0){var e=t[t.length-1];e.pause(),e.currentTime=0}},playUnit:function(){var t=this;this.ifPlayingPause(),this.getVideoCredentials(this.current.videoId).then((function(){vdo.add({otp:t.$store.state.video.otp,playbackInfo:t.$store.state.video.playbackInfo,theme:"013dbcec32f0460dbd9667febfa46158",container:document.querySelector("#videoBox")})})).catch((function(t){console.error(t)}))}})},u=l,d=(i("87b0"),i("2877")),p=Object(d["a"])(u,o,r,!1,null,null,null),h=p.exports,f=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"chapters"},t._l(t.chapters,(function(e){return i("el-card",{key:e._id,staticClass:"chapter-card",attrs:{shadow:"hover"}},[i("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[i("span",{staticClass:"chapterTitle"},[t._v(t._s(e.chapterTitle))]),i("el-button",{staticStyle:{float:"right",padding:"3px 0"},attrs:{type:"text",icon:"el-icon-edit"}})],1),t._l(e.units,(function(c){return i("div",{key:c._id,staticClass:"uits-list-item"},[i("div",{staticClass:"unit-btn",class:t.current.unitTitle===c.unitTitle?"active":"",on:{click:function(i){return t.playUnit({unitDescription:c.unitDescription,chapterDescription:e.chapterDescription,unitTitle:c.unitTitle,videoId:c.video.videoId,chapterTitle:e.chapterTitle})}}},[t._v(t._s(c.unitTitle)+" ")]),c.unitResourcesNames.length>0?i("el-collapse",{staticClass:"collapse"},[i("el-collapse-item",{attrs:{title:"Resources",name:"1"}},[i("template",{slot:"title"},[i("div",{staticClass:"collapse-title"},[i("i",{staticClass:"el-icon-collection",staticStyle:{"font-size":"14px","margin-right":".3rem"}}),t._v("Resources")])]),t._l(c.unitResourcesNames,(function(e,c){return i("div",{key:c,staticClass:"resource-item"},[i("el-button",{attrs:{icon:"el-icon-download",type:"text"},on:{click:function(i){return t.donwloadFile(e)}}},[t._v(" "+t._s(e)+" ")])],1)}))],2)],1):t._e()],1)}))],2)})),1)},v=[],b=(i("d3b7"),i("3ca3"),i("ddb0"),i("2b3d"),i("cabd")),m={mounted:function(){},computed:Object(s["a"])(Object(s["a"])(Object(s["a"])({},Object(a["e"])("course",["course"])),Object(a["e"])("video",["current"])),{},{chapters:function(){return this.course.courseChaptersArray}}),methods:Object(s["a"])(Object(s["a"])({},Object(a["d"])("video",["SET_CURRENT_OBJECTS"])),{},{playUnit:function(t){this.SET_CURRENT_OBJECTS(t),this.$emit("playUnit")},donwloadFile:function(t){Object(b["a"])(t).then((function(e){console.log(e);var i=new Blob([e.data],{type:e.headers["content-type"]}),c=URL.createObjectURL(i),n=document.createElement("a");n.href=c,n.setAttribute("download",t),document.body.appendChild(n),n.click()})).catch((function(t){console.error(t)}))}})},y=m,_=(i("92b2"),Object(d["a"])(y,f,v,!1,null,null,null)),C=_.exports,O={components:{mainPart:h,chapters:C},mounted:function(){var t=this;this.GET_COURSE(this.$route.params.id).then((function(){console.log("got course",t.course);var e=t.course.courseChaptersArray[0];t.SET_CURRENT_OBJECTS({unitTitle:e.units[0].unitTitle,videoId:e.units[0].video.videoId,chapterTitle:e.chapterTitle,unitDescription:e.units[0].unitDescription,chapterDescription:e.chapterDescription}),t.playCurrentUnit()})).catch((function(t){console.error(t)}))},computed:Object(s["a"])({},Object(a["e"])("course",["course"])),methods:Object(s["a"])(Object(s["a"])(Object(s["a"])({},Object(a["d"])("video",["SET_CURRENT_OBJECTS"])),Object(a["b"])("course",["GET_COURSE"])),{},{playCurrentUnit:function(){this.$refs.mainPartRef.playUnit()}})},T=O,j=(i("0d5c"),Object(d["a"])(T,c,n,!1,null,"bf069252",null));e["default"]=j.exports},"87b0":function(t,e,i){"use strict";i("9143")},9143:function(t,e,i){},"92b2":function(t,e,i){"use strict";i("b690")},b690:function(t,e,i){}}]);