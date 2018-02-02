(function () {

    var timeBetweenAnimations = 5000;
    var time = 0;
    var timer = document.getElementById('timer');
    var funnyImage = document.getElementById('funny-image');
    var interval;

    function flashing() {
        document.getElementById('msg').innerText = 'Ostatnie zadanko';
        timer.classList.add('blink_me');
    }

    function end() {
        document.getElementById('msg').innerText = '';
        timer.innerText = 'koniec';
    }

    setInterval(function () {
        var which = 'play-' + parseInt((Math.random() * 3) + 1);
        console.log(which);
        funnyImage.classList.add(which);
        setTimeout(function () {
            funnyImage.classList.remove(which);
        }, timeBetweenAnimations - 200);
    }, timeBetweenAnimations);

    document
        .getElementById('button')
        .addEventListener('click', function () {
            var minutes = document.getElementById('time').value;
            minutes = parseInt(minutes) || 0;
            if (minutes < 0) {
                alert('Knopers proszę wyjść.');
                window.reload();
            }
            time = minutes * 60 * 1000;

            var currentTime = new Date().getTime();
            if (interval) clearInterval(interval);
            interval = setInterval(function () {
                var now = new Date().getTime();
                var dt  = now - currentTime;
                var left = time - dt;

                if (left <= 0) {
                    end();
                    clearInterval(interval);
                    end();
                    return;
                }

                var minutes = parseInt(left / 60000);
                left -= minutes * 60000;
                var seconds =  parseInt(left / 1000);
                left -= seconds * 1000;

                if (minutes <= 9) {
                    flashing();
                }

                if (minutes < 10) minutes = '0' + minutes;
                if (seconds < 10) seconds = '0' + seconds;
                if (left < 10) left = '00' + left;
                else if (left < 100) left = '0' + left;
                
                timer.innerText = minutes + ':' + seconds + ':' + left
            }, 10);
    });
    
    

})();