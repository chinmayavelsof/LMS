document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.delete-book-link').forEach(function(link) {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      var url = this.getAttribute('data-url');
      Swal.fire({
        title: 'Are you sure?',
        text: 'Do you want to delete this book?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then(function(result) {
        if (result.isConfirmed) {
          window.location.href = url;
        }
      });
    });
  });
});