<%  
//setting response code as 404
response.setStatus(HttpServletResponse.SC_NOT_FOUND);
try {
    String uri = request.getRequestURI();
         
    if(uri.matches("(/content/ets-org/language-master/en/)(.*)"))
    {
        pageContext.include("/content/ets-org/language-master/en/home/500.html");
    }else if(uri.matches("(/en/)(.*)"))
    {
        pageContext.include("/content/ets-org/language-master/en/home/500.html");
    } else
    {
        pageContext.include("/content/ets-org/language-master/en/home/500.html");
    }
 
} catch (Exception e) {

%>
        Page Not Found
<%
}

%>
