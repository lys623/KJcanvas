Rectangle = function(cfg)
{
	this.setArguments(cfg);
}
Rectangle.prototype = new Shape;  //继承图形父类
Rectangle.prototype.drawMethod = function() //绘画矩形的方法
{
	this.canvas.ctx.fillStyle = this.backColor;  
	this.canvas.ctx.fillRect(this.x-this.w/2,this.y-this.h/2,this.w,this.h);  //画一个实体矩形
	this.canvas.ctx.strokeStyle = this.edgeColor;
	this.canvas.ctx.lineWidth = this.edgeWidth;
	this.canvas.ctx.strokeRect(this.x-this.w/2,this.y-this.h/2,this.w,this.h); //勾画出矩形边框

	this.canvas.ctx.fillStyle = this.textColor;      //在矩形中间绘制文本
	this.canvas.ctx.textAlign = this.textAlign;
	this.canvas.ctx.font = this.font;
	this.canvas.ctx.textBaseline = this.textBaseline; 
	this.canvas.ctx.fillText(this.text,this.x,this.y);  
}
