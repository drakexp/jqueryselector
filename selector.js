var $ = function (selector) {
   var selectors = selector.split(/(?=\.)|(?=#)/);
   var elements = getElements(selectors);
   
   // if elements are empty or there is only one selector
   if(elements == [] || selectors.length == 1) {
      return elements;
   }
   else {
      selectors = selectors.splice(1,selectors.length);
      elements = filterElements(elements, selectors);
   }
   
   return elements;
}

var getElements = function(selectors) {
   var result = [];
   var selector = selectors[0];
   if(selector[0] == '.')
      result = document.getElementsByClassName(selector.slice(1));
   else if (selector[0] == '#')
      result.push(document.getElementById(selector.slice(1)));
   else
      result = document.getElementsByTagName(selector);
   return result;
}

var filterElements = function(objects, selectors) {
   var result = [];
   for (var i = 0; i < objects.length; i++) {
      var flag = true;
      for(var j = 0; j < selectors.length; j++) {
         if(selectors[j][0] == '.') {
            if(!objects[i].classList.contains(selectors[j].slice(1)))  {
               flag = false;
               break;
            }
         }
         else if (selectors[j][0] == '#') {
            if(objects[i].id != selectors[j].slice(1)) {
               flag = false;
               break;
            }
         }
      }
      if(flag == true) {
         result.push(objects[i]);
      }
   }

   return result;
};