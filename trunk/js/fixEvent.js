function fixEvent(e) {
    // �������� ������ ������� ��� IE
    e = e || window.event
 
    // �������� pageX/pageY ��� IE
    if ( e.pageX == null && e.clientX != null ) {
        var html = document.documentElement
        var body = document.body
        e.pageX = e.clientX + (html && html.scrollLeft || body && body.scrollLeft || 0) - (html.clientLeft || 0)
        e.pageY = e.clientY + (html && html.scrollTop || body && body.scrollTop || 0) - (html.clientTop || 0)
    }
 
    // �������� which ��� IE
    if (!e.which && e.button) {
        e.which = e.button & 1 ? 1 : ( e.button & 2 ? 3 : ( e.button & 4 ? 2 : 0 ) )
    }
 
    return e
}