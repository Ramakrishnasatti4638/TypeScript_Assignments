using System;
using Microsoft.AspNetCore.Mvc;

namespace NewMedicalAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class ContactsController : ControllerBase
    {
        private static List<Contacts> _Contacts = new List<Contacts>
        {
            new Contacts{ID="2",Name="Rama",Email="rama@gmail.com", Phone="789654123"},
            new Contacts{ID="3",Name="Krishna",Email="krishna@gmail.com", Phone="65431561"},
            new Contacts{ID="4",Name="Reddy",Email="reddy@gmail.com", Phone="351565611"}
        };

        [HttpGet]

        public IActionResult GetContacts()
        {
            return Ok(_Contacts);
        }

        [HttpGet("{id}")]

        public IActionResult GetMedicine(string id)
        {
            var medicine = _Contacts.Find(m => m.ID == id);
            if (medicine == null)
            {
                return NotFound();
            }
            return Ok(medicine);
        }


        [HttpPost]

        public IActionResult PostMedicine([FromBody] Contacts medicine)
        {
            _Contacts.Add(medicine);
            //You might want to return NoContent or another appropriate response
            return Ok();
        }

        //Updating an existing medicine
        //PUT: api/Contacts/1
        [HttpPut("{id}")]
        public IActionResult PutMedicine(string id,[FromBody] Contacts medicine)
        {
            var index=_Contacts.FindIndex(m=>m.ID==id);
            if(index<0)
            {
                return NotFound();
            }
            _Contacts[index]=medicine;
            //You might want to return NoContent or another appropriate response
            return Ok();
        }

        //Deleting an existing medicine
        //DELETE: api/Contacts/1
        [HttpDelete("{id}")]
        public IActionResult DeleteContact(string id)
        {
            var medicine=_Contacts.Find(m=>m.ID==id);
             if (medicine == null)
            {
                return NotFound();
            }
            _Contacts.Remove(medicine);
            return Ok();
        }
    }
}