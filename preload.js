/**
 * Created by hlwcx on 2017/9/5.
 */
//图片预加载
(function($){

    function Preload(imgs,options){
        this.imgs = (typeof imgs === 'string') ? [imgs] :imgs;
        this.opts = $.extend({},Preload.DEFAULTS,options)
        this._unoredered();
    }
    Preload.DEFAULTS={
        each:null,//每一张图片加载完毕后执行
        all:null//所有图片加载完毕后执行
    };
    Preload.prototype._unoredered = function(){//无序加载
        var imgs=this.imgs,
            opts=this.opts,
            count= 0,
            len=imgs.length;

        $.each(imgs,function(i,src){
            if(typeof src !='string')return;
            var imgObj=new Image();
            $(imgObj).on('load error',function(){
                opts.each && opts.each(count);
                if(count>=len-1){
                   opts.all && opts.all();
                }
                count++;
            });
            imgObj.src=src;
        });
    };
    $.extend({
        preload:function(imgs,opts){
            new Preload(imgs,opts);
        }
    })
})(jQuery);