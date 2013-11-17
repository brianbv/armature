function Armature(params)
{
	var armature=this;
	if (params.svgElement!=null) initialize(params.svgElement);
	
	$(document).keydown( function(e) {
		if (e.keyCode == 37)  armature.rotator.previous();
		else if (e.keyCode == 39)  armature.rotator.next();
		
	  });
	
	function initialize(svgElement)
	{
		$('#ArmatureInfo').hide();
		var slides=[],
			items = [];
		
		$(svgElement).find('.data-node').each( function(i,el)
		 {
			 var $el = $(el),
				 set = $el.attr('id').split('ArmatureDataNode-')[1],
				 slideSet=parseData( $el.attr('inkscape:label') );
				 
				slideSet['on_ids'] =  '#' + slideSet['on'].split(' ').join('').split(',').join(',#');
				slideSet['off_ids'] = '#' + slideSet['off'].split(' ').join('').split(',').join(',#');
				slideSet['set']=slideSet;
				
				slides[set] = slideSet;
				items.push(slideSet);
		 });
		 

		 armature.rotator = new Rotator(items, function(previous,current)
		{
			
			var slide=armature.rotator.current();
			console.log(slide['off_ids']);
			console.log(slide['on_ids']);
			$(slide['off_ids']).hide();
			$(slide['on_ids']).show();
		});
	}
	
	function parseData(d)
	{
		result = [];
		parts=d.split(';');
		for (var i=0;i<parts.length;i++){
		   pair = parts[i].split(':');
		   result[pair[0]]=pair[1];
		}
		return result;
	}
 
}

function Rotator(items,updateCallback)
{
		var rotator=this;
        this.index = 0;
        this.items = items;
        this.updated = updateCallback;

        this.current=function(){ return this.items[this.index]; }
        this.indicatorText = function() { return (this.index+1).toString() + "/" + (this.items.length).toString(); }

        this.next = function()
        {
			var previous = rotator.current();
            if (this.items==null) return; 
            if (++this.index>=this.items.length) this.index=0;
            this.updated(previous,rotator.current());
        }

        this.previous = function()
        {
			var previous = rotator.current();
            if (this.items==null) return; 
            if (--this.index<0 && this.items!=null) this.index=this.items.length-1;
            this.updated(previous,rotator.current());
        }
};