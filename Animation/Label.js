Label = function(cfg) //文本标签类
{
	this.argument = new Array(1000);
	this.saveArgumentsFlag = false;
	this.setArguments(cfg);
}
Label.prototype = new Shape;  //继承图形父类
Label.prototype.drawMethod = function() //绘画文本标签的方法
{
	this.Canvas.ctx.fillStyle = this.textColor;      
	this.Canvas.ctx.textAlign = this.textAlign;
	this.Canvas.ctx.font = this.font;
	this.Canvas.ctx.textBaseline = this.textBaseline;
	this.Canvas.ctx.fillText(this.text,this.x,this.y);  
}
