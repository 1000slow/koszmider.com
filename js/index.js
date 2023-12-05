<!DOCTYPE html>
<html>
<head>
    <title>Change Background Color on Scroll</title>
    <style>
        body {
            height: 2000px; /* Just to make the page scrollable for demonstration purposes */
        }
    </style>
</head>
<body>
    <h1>Scroll down to change the background color</h1>

    <script>
        // Function to change the background color to black on scroll
        function changeBackgroundColorOnScroll() {
            const scrollPosition = window.scrollY; // Get the current vertical scroll position

            // Set the background color to black when scrolling
            if (scrollPosition > 0) {
                document.body.style.backgroundColor = 'black';
            } else {
                document.body.style.backgroundColor = ''; // Revert to the default background color if scroll position is at the top
            }
        }

        // Attach the function to the 'scroll' event of the window
        window.addEventListener('scroll', changeBackgroundColorOnScroll);
    </script>
</body>
</html>
