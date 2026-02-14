(function() {
    var form = document.getElementById('addBookForm') || document.getElementById('editBookForm');
    if (!form) return;

    var imageOk = ['image/jpeg', 'image/jpg', 'image/png'];
    var maxSize = 2 * 1024 * 1024;

    function checkImage(file) {
        if (!file || !file.name) return null;
        if (!imageOk.includes(file.type)) return 'Only JPEG, JPG and PNG allowed.';
        if (file.size > maxSize) return 'File must be less than 2MB.';
        return null;
    }

    function showErrors(errors) {
        var imgErr = document.getElementById('bookImageError');
        if (imgErr) imgErr.textContent = (errors.book_image && errors.book_image[0]) || '';
        ['book_name', 'author_name', 'isbn'].forEach(function(name) {
            var input = form.querySelector('[name="' + name + '"]');
            var span = input && input.nextElementSibling;
            if (span) span.textContent = (errors[name] && errors[name][0]) || '';
        });
    }

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        var file = (document.getElementById('bookImage').files || [])[0];
        var msg = checkImage(file);
        var imgErr = document.getElementById('bookImageError');
        if (imgErr) imgErr.textContent = '';
        if (msg) {
            if (imgErr) imgErr.textContent = msg;
            return;
        }

        var submitBtn = document.getElementById('bookSubmitBtn');
        var cancelBtn = document.getElementById('bookCancelBtn');
        if (submitBtn) submitBtn.disabled = true;
        if (cancelBtn) cancelBtn.disabled = true;

        $.ajax({
            url: form.getAttribute('action'),
            type: 'POST',
            data: new FormData(form),
            cache: false,
            contentType: false,
            processData: false,
            success: function(data) {
                window.location.href = (data && data.redirect) || '/books';
            },
            error: function(xhr) {
                if (submitBtn) submitBtn.disabled = false;
                if (cancelBtn) cancelBtn.disabled = false;
                var err = xhr.responseJSON && xhr.responseJSON.errors;
                if (err) showErrors(err);
                Swal.fire({
                    title: 'Error',
                    text: err && err._general && err._general[0] ? err._general[0] : 'Something went wrong.',
                    icon: 'error'
                });
            }
        });
    });
})();
