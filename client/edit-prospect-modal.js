var editProspectModal = (function() {

  return {
    open: function(prospect) {
      $('#editModal').on('show.bs.modal', () => {
        const nameInput = document.querySelector('#edit-modal-prospect-name');
        nameInput.value = prospect.name;
        const emailInput = document.querySelector('#edit-modal-prospect-email');
        emailInput.value = prospect.email;
      });

      $('#editModal').modal();

      const updateButton = document.querySelector('#edit-prospect-modal-update-btn');
      updateButton.onclick = (e) => {
        console.log(e);
      };
    },
    close: function() {

    }
  }
})();

