var editProspectModal = (function() {

  return {
    open: function(prospect) {
      $('#editModal').on('show.bs.modal', () => {
        const idInput = document.querySelector('#edit-modal-prospect-id');
        idInput.value = prospect.id;
        const nameInput = document.querySelector('#edit-modal-prospect-name');
        nameInput.value = prospect.name;
        const emailInput = document.querySelector('#edit-modal-prospect-email');
        emailInput.value = prospect.email;
      });

      $('#editModal').modal();

      const updateButton = document.querySelector('#edit-prospect-modal-update-btn');
      updateButton.onclick = (e) => {
        console.log(e);
        const idInput = document.querySelector('#edit-modal-prospect-id');
        const nameInput = document.querySelector('#edit-modal-prospect-name');
        const emailInput = document.querySelector('#edit-modal-prospect-email');
        const payload = {
          name: nameInput.value,
          email: emailInput.value
        }

        fetch(`api/prospects/${idInput.value}` , { 
            method: 'PUT', 
            body: JSON.stringify(payload),
            headers: {
              'Content-Type': 'application/json'
            } 
          })
          .then(res => {
            fetchProspects().then(updatedProspects => {
              recreateProspectTable(updatedProspects);
              $('#editModal').modal('hide');
            });
          });
      };
    },
    close: function() {
      $('#editModal').modal('hide');
    }
  }
})();

