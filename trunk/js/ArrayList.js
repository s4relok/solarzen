function ArrayList()
{
  this.array = new Array();
  this.add = function(obj){
    this.array[this.array.length] = obj;
  }
  this.iterator = function (){
    return new Iterator(this)
  }
  this.length = function (){
    return this.array.length;
  }
  this.get = function (index){
    return this.array[index];
  }
  this.set = function (index, obj){
  	this.array[index] = obj;
  }
  this.addAll = function (obj)
  {
    if (obj instanceof Array){
      for (var i=0;i<obj.length;i++)
      {
        this.add(obj[i]);
      }
    } else if (obj instanceof ArrayList){
      for (var i=0;i<obj.length();i++)
      {
        this.add(obj.get(i));
      }
    }
  }
}

function Iterator (arrayList){
  this.arrayList = arrayList;
  this.index = 0;
  this.hasNext = function (){
    return this.index < this.arrayList.length();
  }
  this.next = function() {
    return this.arrayList.get(this.index++);
  }
}
