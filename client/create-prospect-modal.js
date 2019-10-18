var createProspectModal = (function() {

  return {
    open: function() {
      $('#createModal').on('show.bs.modal', () => {
      });

      $('#createModal').modal();

      const updateButton = document.querySelector('#create-prospect-modal-update-btn');
      updateButton.onclick = (e) => {
        console.log(e);
        const idInput = document.querySelector('#create-modal-prospect-id');
        const nameInput = document.querySelector('#create-modal-prospect-name');
        const emailInput = document.querySelector('#create-modal-prospect-email');
        const payload = {
          name: nameInput.value,
          email: emailInput.value
        }

        fetch(`api/prospects/${idInput.value}` , { 
            method: 'POST', 
            body: JSON.stringify(payload),
            headers: {
              'Content-Type': 'application/json'
            } 
          })
          .then(res => {
            fetchProspects().then(updatedProspects => {
              recreateProspectTable(updatedProspects);
              $('#createModal').modal('hide');
            });
          });
      };
    },
    close: function() {
      $('#createModal').modal('hide');
    }
  }
})();