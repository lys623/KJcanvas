function init()
{
	var ArrayStack = new Stack();  //初始化一个堆栈对象
	ArrayStack.addControls(ArrayStack);  //添加堆栈用户控制器

	var Mycanvas = document.getElementsByTagName("canvas")[0]; //初始化canvas对象
	ArrayStack.canvas = new Canvas(Mycanvas);  //将该canvas对象绑定到该堆栈上
}

Stack = function(size)
{
}
Stack.ALGORITHM_NAME = "堆栈(数组)"; //算法名	
Stack.SIZE = 7; //默认堆栈的大小
Stack.OVERFLOW_INFO = "堆栈吃饱了,再压栈,堆栈会撑死的！";
Stack.EMPTY_INFO = "堆栈里空空如也了,弹不出东西了！";

Stack.FRAME_WIDTH = 60;
Stack.FRAME_HEIGHT = 60;
Stack.FRAME_START_X = (Canvas.WIDTH-Stack.FRAME_WIDTH)/2;
Stack.FRAME_START_Y = Canvas.HEIGHT-Stack.FRAME_HEIGHT-10;
Stack.FRAME_TEXT = "";
Stack.FRAME_BACKCOLOR = "FFF";
Stack.FRAME_EDGECOLOR = "000";

Stack.SHAPE_BACKCOLOR = "ABC";  //默认图形填充背景色
Stack.SHAPE_EDGECOLOR = "000";  //默认图形边框颜色
Stack.SHAPE_TEXTCOLOR = "C00";  //默认图形填充文本颜色
Stack.SHAPE_TEXT = "shape";    //默认图新填充的文本内容
Stack.SHAPE_WIDTH = 40;       //默认图形宽度
Stack.SHAPE_HEIGHT = 40;      //默认图形高度
Stack.SHAPE_START_X = 0;           //默认图新位置
Stack.SHAPE_START_Y = 0;
Stack.SHAPE_MOVE_SPEED = 5;  //默认图新移动速度
Stack.SHAPE_MOVE_PATH = "LINE"; //默认图新移动方式(直线)
Stack.SHAPE_FONT = "10px sans-serif";

Stack.POINTER_FONT = "20px sans-serif";
Stack.POINTER_MOVE_SPEED = 2;
Stack.POINTER_START_X = Stack.FRAME_START_X + Stack.FRAME_WIDTH+100;
Stack.POINTER_START_Y = Stack.FRAME_START_Y + Stack.FRAME_HEIGHT/2;
Stack.POINTER_COLOR = "000";

Stack.prototype = new Algorithm();
Stack.prototype.create = function(stackSize)  //初始化堆栈大小,并绘制该堆栈
{
	this.stack = new Array();  
	this.frame = new Array();
	this.pointer = new Label("top",Stack.POINTER_COLOR,Stack.POINTER_FONT);
	this.line = new Line();
	this.size = Stack.SIZE;
	this.top = 0;
	if(Positive_Integer.test(stackSize))
		this.size = stackSize;
	
	this.canvas.del();
	this.canvas.clear();
	this.canvas.cmd("Setup");
	this.canvas.cmd("Draw",this.pointer,Stack.POINTER_START_X,Stack.POINTER_START_Y);
	for(i=0; i<this.size; i++)
	{
		this.frame[i] = new Rectangle(
			Stack.FRAME_WIDTH, Stack.FRAME_HEIGHT, 
			Stack.FRAME_TEXT, 
			Stack.FRAME_BACKCOLOR, Stack.FRAME_EDGECOLOR
			); 
		this.canvas.cmd("Draw",this.frame[i], Stack.FRAME_START_X, Stack.FRAME_START_Y-i*Stack.FRAME_HEIGHT);
	}
}
Stack.prototype.push = function( value )
{
	if(this.top >= this.size)
		alert(Stack.OVERFLOW_INFO);
	else
	{
		$(".controler").attr("disabled","disabled");  //禁用所有控制元素
	
		this.stack[this.top] = new Rectangle(
			Stack.SHAPE_WIDTH, Stack.SHAPE_HEIGHT,
			value,
			Stack.SHAPE_BACKCOLOR, Stack.SHAPE_EDGECOLOR, Stack.SHAPE_TEXTCOLOR,
			Stack.SHAPE_FONT
			);
		this.canvas.cmd("Setup");	
		this.canvas.cmd("Draw",this.stack[this.top],Stack.SHAPE_START_X,Stack.SHAPE_START_Y);
		this.canvas.cmd("Delay",Canvas.DELAY_TIME);
		this.pointer.text = "top";
 		waitTime = this.canvas.cmd(
			"Move", this.stack[this.top],
			this.frame[this.top].x+(Stack.FRAME_WIDTH-Stack.SHAPE_WIDTH)/2,
			this.frame[this.top].y+(Stack.FRAME_HEIGHT-Stack.SHAPE_HEIGHT)/2,
			Stack.SHAPE_MOVE_SPEED,
			
			"Move",this.pointer,
			this.frame[this.top].x+(Stack.FRAME_WIDTH+100),this.frame[this.top].y+(Stack.FRAME_HEIGHT/2),
			Stack.POINTER_MOVE_SPEED
			);
		this.line.startObject = this.pointer;
		this.line.endObject = this.frame[this.top];
		this.canvas.cmd("Draw",this.line);
		this.pointer.text = "top = "+this.top;
		var me = this; 
		setTimeout(function(){
			me.top++
			$(".controler").removeAttr("disabled");
		},waitTime);	
	}
}
Stack.prototype.pop = function()
{
	if(this.top <= 0)
		alert(Stack.EMPTY_INFO);
	else
	{
		$(".controler").attr("disabled","disabled");
	
	 	this.top--;

		this.canvas.cmd("Setup");
		this.pointer.text = "top = "+this.top;
	   	this.canvas.cmd(
			"Move",this.stack[this.top],
			Stack.SHAPE_START_X,Stack.SHAPE_START_Y,
			Stack.SHAPE_MOVE_SPEED,
			
			"Move",this.pointer,
			this.frame[this.top].x+(Stack.FRAME_WIDTH+100),this.frame[this.top].y+(Stack.FRAME_HEIGHT/2),
			Stack.POINTER_MOVE_SPEED
		);
		this.canvas.cmd("Delay",Canvas.DELAY_TIME);
	
		waitTime = this.canvas.cmd("Delete",this.stack[this.top]);
	
		var me = this;	
		setTimeout(function(){
			$(".controler").removeAttr("disabled");
		/*	if(me.top <= 0)
				me.PopButton.disabled = true;*/
		},waitTime);		
	}
}
Stack.prototype.addControls = function(obj)
{
	$("#AlgorithmName").html(Stack.ALGORITHM_NAME);
	this.TextInput = this.addAlgorithmControlBar("text","");
	this.CreatStackButton = this.addAlgorithmControlBar("button","Creat Stack");
	this.CreatStackButton.onclick = function(){
		var stackSize = obj.TextInput.value;
		obj.create(stackSize);
		obj.TextInput.value = "";
		obj.PushButton.disabled = false;
	}

	this.PushButton = this.addAlgorithmControlBar("button","Push");
	this.PushButton.onclick = function(){
		var value = obj.TextInput.value;
		obj.push(value);	
		obj.TextInput.value = "";
	}

	this.PopButton = this.addAlgorithmControlBar("button","Pop");
	this.PopButton.onclick = function(){
		obj.pop();
	}

	this.PushButton.disabled = true;
	this.PopButton.disabled = true;
}
