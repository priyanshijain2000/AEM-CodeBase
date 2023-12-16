// const closeAllSelect = el => {
//     // Close all other select boxes except for the el past as an argument
//     Array.from(document.querySelectorAll('.select--active'))
//         .filter(o => o !== el)
//         .forEach(o => o.classList.remove('select--active'));
// };
// (() => {
//     var category = $(".select__item--selected").val();
//     var dataPath = $("#press-release-group").data('press-release-path');
//     //dataPath = "/src/main/webpack" + dataPath + category;
//     // dataPath = "/bin/ets/fetchNewsPages.json?path=" + dataPath + "&category=" + category;
//     //dataPath = "/src/main/webpack/components/js/pressRelease.json";
//     /*  $.getJSON(dataPath, function(data) {
//           var filterdropDown = data.category;
//           $.each(filterdropDown, function(index, value) {
//               $('#filterdropDown').append('<option value="' + value.value + '">' + value.title + '</option>');
//           });
//           const selectEls = document.querySelectorAll('.field-group .select');

//           Array.from(selectEls).forEach(selectContainer => {
//               const selectEl = selectContainer.querySelector('select');
//               if (!selectEl) return;

//               // Hide original select
//               selectEl.style.display = 'none';

//               // Make the select Container tabbable
//               selectContainer.setAttribute('tabindex', '0');
//               selectContainer.setAttribute('aria-haspopup', 'listbox');

//               const a = document.createElement('div');
//               a.className = 'select__selected';
//               a.innerHTML = selectEl.options[selectEl.selectedIndex].innerHTML;
//               a.setAttribute('aria-label', `unselected listbox`);
//               a.setAttribute('aria-live', `polite`);
//               selectContainer.append(a);

//               const b = document.createElement('div');
//               b.className = 'select__options';
//               b.setAttribute('role', 'listbox');

//               // Remove hidden options
//               Array.from(selectEl.children).forEach(o => {
//                   if (o.hasAttribute('hidden') || o.hasAttribute('disabled')) o.remove();
//               })

//               const selectArr = Array.from(selectEl);
//               selectArr.forEach((opt, i) => {
//                   const c = document.createElement('div');
//                   c.className = 'select__item';
//                   c.innerHTML = opt.innerHTML;
//                   c.setAttribute('role', 'option');
//                   c.setAttribute('categoryValue', $(opt).val());

//                   if (i === selectEl.selectedIndex) {
//                       c.classList.add('select__item--selected');
//                   }

//                   c.addEventListener('click', e => {
//                       // Set text
//                       a.innerHTML = c.innerHTML;
//                       selectArr.forEach((o, i) => {
//                           if (o.innerHTML === c.innerHTML) {
//                               selectEl.selectedIndex = i;
//                               // remove class from siblings
//                               Array.from(c.parentNode.querySelectorAll('.--selected'))
//                                   .forEach(p => p.classList.remove('select__item--selected'));
//                               // add selected to self;
//                               c.classList.add('select__item--selected');
//                           }
//                       })
//                   });

//                   b.append(c);
//               })

//               selectContainer.append(b);


//               const handleClick = e => {
//                   e.stopPropagation();
//                   closeAllSelect(selectContainer);
//                   // Toggle self
//                   selectContainer.classList.toggle('select--active');
//               }

//               const updateFromInput = () => {
//                   const index = selectEl.selectedIndex;
//                   a.innerHTML = selectEl.options[index].innerHTML;
//                   Array.from(b.querySelectorAll('.select__item'))
//                       .forEach((c, i) => {
//                           if (i === index)
//                               c.classList.add('select__item--selected');
//                           else
//                               c.classList.remove('select__item--selected');
//                       });
//               }

//               a.addEventListener('click', handleClick);
//               selectContainer.addEventListener('keydown', e => {
//                   let index = selectEl.selectedIndex;
//                   switch (e.which) {
//                       case 13:
//                       case 32:
//                           handleClick(e);
//                           break;
//                       case 38: // UP
//                           if (--index < 0) index = selectEl.options.length - 1;
//                           selectEl.selectedIndex = index;
//                           updateFromInput();
//                           selectContainer.classList.add('select--active');
//                           break;
//                       case 40: // DOWN
//                           if (++index > selectEl.options.length - 1) index = 0;
//                           selectEl.selectedIndex = index;
//                           updateFromInput();
//                           selectContainer.classList.add('select--active');
//                           break;
//                       case 27: // ESC
//                       case 9: // TAB
//                           selectContainer.classList.remove('select--active');
//                           break;
//                       case 35: // END
//                           selectEl.selectedIndex = 0;
//                           updateFromInput();
//                           selectContainer.classList.add('select--active');
//                           break;
//                       case 36: // HOME
//                           selectEl.selectedIndex = selectEl.options.length - 1;
//                           updateFromInput();
//                           selectContainer.classList.add('select--active');
//                           break;
//                   }
//               })
//           })
//       });*/

//     function loadSearch(searchString, isFirstCall = false) {
//         var searchDataPathElement = document.querySelector(".state-search__select");
//         var searchDataPath = $(searchDataPathElement).attr("search-data-path");
//         $.getJSON(searchDataPath, function(data) {
//             var filterdropDown = data.states;
//             if (searchString && searchString != '') {
//                 filterdropDown = data.states.filter(state => state.stateName.toString().toLowerCase().includes(searchString.toString().toLowerCase()) || state.stateKey.toString().toLowerCase() == searchString.toString().toLowerCase());
//             }

//             function sortObj(obj, sortString) {
//                 obj.sort(function(a, b) {
//                     if (a[sortString] && b[sortString])
//                         return a[sortString].localeCompare(b[sortString]);
//                 });
//                 return obj;
//             }
//             filterdropDown = sortObj(filterdropDown, 'stateName');

//             $('.state-search__select option').remove();
//             $.each(filterdropDown, function(index, value) {
//                 $('#stateSearch').append('<option value="' + value.pagePath + '.html' + '" stateCode="' + value.stateKey + '">' + value.stateName + '</option>');
//             });
//             const selectEls = document.querySelectorAll('.state-search__select');

//             Array.from(selectEls).forEach(selectContainer => {
//                 const selectEl = selectContainer.querySelector('select');
//                 selectEl.selectedIndex = -1;
//                 const formElement = selectContainer.querySelector('form');
//                 const pillElement = selectContainer.querySelector('.state-search__select__search-pill');
//                 const closeIconEl = selectContainer.querySelector('.state-search__select__search-close');
//                 const spanElement = selectContainer.querySelector('span');
//                 const ctaElement = selectContainer.querySelector('.cta-btn-primary');
//                 const inputElement = selectContainer.querySelector('input');
//                 const inputElementPlaceholder = inputElement.placeholder;
//                 ctaElement.setAttribute("disabled", "disabled");
//                 ctaElement.setAttribute("tabindex", "-1");

//                 if (!selectEl) return;

//                 // Hide original select
//                 selectEl.style.display = 'none';

//                 // Make the select Container tabbable
//                 selectContainer.setAttribute('tabindex', '-1');
//                 selectContainer.setAttribute('aria-haspopup', 'listbox');

//                 $('.state-search__select .select__options').remove();

//                 const b = document.createElement('div');
//                 b.className = 'select__options';
//                 b.setAttribute('role', 'listbox');
//                 b.setAttribute('id', 'selectBoxContainer');

//                 // Remove hidden options
//                 Array.from(selectEl.children).forEach(o => {
//                     if (o.hasAttribute('hidden') || o.hasAttribute('disabled')) o.remove();
//                 })

//                 var stateInfo = sessionStorage.getItem("stateInfo");
//                 if (stateInfo) {
//                 var stateInfoDict = JSON.parse(stateInfo);
//                 spanElement.innerHTML = stateInfoDict['Name'];
//                 }
//                 const selectArr = Array.from(selectEl);

//                 selectArr.forEach((opt, i) => {
//                     const c = document.createElement('div');
//                     c.className = 'select__search-item';
//                     c.innerHTML = opt.innerHTML;
//                     c.setAttribute('role', 'option');
//                     c.setAttribute('id', 'searchItems_'+i);
//                     c.setAttribute('categoryValue', $(opt).val());
//                     c.setAttribute('stateCode', $(opt).attr('stateCode'));

//                     if (c.innerHTML === spanElement.innerHTML) {
//                         c.classList.add('select__search-item--selected');
//                         ctaElement.href = $(c).attr("categoryValue");
//                         ctaElement.removeAttribute("disabled");
//                         ctaElement.removeAttribute("tabindex");
//                         //pillElement.style.display = 'flex';
//                         //spanElement.innerHTML = c.innerHTML;
//                         pillElement.style.display = 'flex';                        
//                         spanElement.innerHTML = c.innerHTML;
//                         inputElement.value = '';
//                         inputElement.placeholder = '';

//                     }

//                     c.addEventListener('click', e => {
//                         // Set text

//                         pillElement.style.display = 'flex';
//                         spanElement.innerHTML = c.innerHTML;
//                         ctaElement.href = $(c).attr("categoryValue");
//                         ctaElement.removeAttribute("disabled");
//                         ctaElement.removeAttribute("tabindex");
//                         inputElement.value = '';
//                         inputElement.placeholder = '';
//                         var stateInfo = {
//                             "Name": c.innerHTML,
//                             "Path": $(c).attr("categoryValue"),
//                             "Code": $(c).attr("stateCode")
//                         };
//                         $('.state-search__select__container input').attr('tabindex', '-1');
//                         sessionStorage.setItem("stateInfo", JSON.stringify(stateInfo));
//                         selectArr.forEach((o, i) => {
//                             if (o.innerHTML === c.innerHTML) {
//                                 selectEl.selectedIndex = i;
//                                 // remove class from siblings
//                                 Array.from(c.parentNode.querySelectorAll('.select__search-item--selected'))
//                                     .forEach(p => p.classList.remove('select__search-item--selected'));
//                                 // add selected to self;
//                                 c.classList.add('select__search-item--selected');
//                             }
//                         })
//                     });                    

//                     b.append(c);
//                 })
//                 if (b.innerHTML == '') {
//                     b.style.visibility = "hidden";
//                 } else {
//                     b.style.visibility = "visible";
//                 }
//                 selectContainer.append(b);


//                 const handleClick = e => {
//                     e.stopPropagation();
//                     closeAllSelect(selectContainer);
//                     // Toggle self
//                     selectContainer.classList.toggle('select--active');
//                     inputElement.getAttribute('aria-expanded')=='false'?inputElement.setAttribute('aria-expanded','true'):inputElement.setAttribute('aria-expanded','false');
//                 }
//                 const closeEvent = e => {
//                     const pillElement = selectContainer.querySelector('.state-search__select__search-pill');
//                     pillElement.style.display = 'none';
//                     $(pillElement).removeClass('d-flex');
//                     spanElement.innerHTML = '';
//                     ctaElement.href = "javascript:;";
//                     inputElement.placeholder = inputElementPlaceholder;                    
//                     selectEl.selectedIndex = -1;
//                     ctaElement.setAttribute("disabled", "disabled");
//                     ctaElement.setAttribute("tabindex", "-1");
//                     $('.state-search__select__container input').attr('tabindex', '0');
//                     $('.state-search__select__container input').focus();
//                     const selectOPtionElement = document.querySelector('.state-search__select .select__options');
//                     Array.from(selectOPtionElement.querySelectorAll('.select__search-item'))
//                         .forEach((c, i) => {
//                             c.classList.remove('select__search-item--selected');
//                         });
//                 }

//                 const updateFromInput = () => {
//                     $('.state-search__select__container input').attr('tabindex', '-1');
//                     $('.state-search__select__container input').blur();
//                     const index = selectEl.selectedIndex;
//                     const selectOPtionElement = document.querySelector('.state-search__select .select__options');
//                     ctaElement.href = selectEl.options[index].value;
//                     inputElement.placeholder = '';
//                     inputElement.value = '';
//                     //a.innerHTML = selectEl.options[index].innerHTML;
//                     pillElement.style.display = 'flex';
//                     $(pillElement).addClass('d-flex')
//                     spanElement.innerHTML = selectEl.options[index].innerHTML;
//                     inputElement.setAttribute("aria-activedescendant","searchItems_"+index);
//                     inputElement.value=selectEl.options[index].innerText;
//                     ctaElement.removeAttribute("disabled");
//                     ctaElement.removeAttribute("tabindex");
//                     Array.from(selectOPtionElement.querySelectorAll('.select__search-item'))
//                         .forEach((c, i) => {
//                             if (i === index)
//                                 c.classList.add('select__search-item--selected');
//                             else
//                                 c.classList.remove('select__search-item--selected');
//                         });
//                     inputElement.focus();
//                 }
//                 const handleSateInputClick = e => {
//                     e.stopPropagation();
//                     closeAllSelect(selectContainer);
//                     // Toggle self
//                     loadSearch('');
//                     selectContainer.classList.toggle('select--active');
//                     inputElement.getAttribute('aria-expanded')=='false'?inputElement.setAttribute('aria-expanded','true'):inputElement.setAttribute('aria-expanded','false');
//                 }

//                 if (isFirstCall) {
//                     inputElement.addEventListener('click', handleSateInputClick);
//                     closeIconEl.addEventListener('keypress', function(e) {
//                         if (e.key === 'Enter') {
//                             closeIconEl.click();
//                         }
//                     });
//                     closeIconEl.addEventListener('click', closeEvent);
//                     inputElement.addEventListener('keydown', function(e) {
//                         let index = selectEl.selectedIndex;
//                         if (e.keyCode >= 48 && e.keyCode <= 57) {
//                             closeEvent(e);
//                         } else if (e.keyCode >= 65 && e.keyCode <= 90) {
//                             closeEvent(e);
//                         } else {
//                             switch (e.which) {
//                                 case 13:
//                                 case 32:
//                                     handleClick(e);
//                                     break;
//                                 case 38: // UP
//                                     if (--index < 0) index = selectEl.options.length - 1;
//                                     selectEl.selectedIndex = index;
//                                     updateFromInput();
//                                     selectContainer.classList.add('select--active');
//                                     inputElement.setAttribute('aria-expanded','true');
//                                     break;
//                                 case 40: // DOWN
//                                     if (++index > selectEl.options.length - 1) index = 0;
//                                     selectEl.selectedIndex = index;
//                                     updateFromInput();
//                                     selectContainer.classList.add('select--active');
//                                     inputElement.setAttribute('aria-expanded','true');
//                                     break;
//                                 case 27: // ESC
//                                 case 9: // TAB
//                                     selectContainer.classList.remove('select--active');
//                                     inputElement.setAttribute('aria-expanded','false');
//                                     break;
//                                 case 35: // END
//                                     selectEl.selectedIndex = 0;
//                                     updateFromInput();
//                                     selectContainer.classList.add('select--active');
//                                     inputElement.setAttribute('aria-expanded');
//                                     break;
//                                 case 36: // HOME
//                                     selectEl.selectedIndex = selectEl.options.length - 1;
//                                     updateFromInput();
//                                     selectContainer.classList.add('select--active');
//                                     inputElement.setAttribute('aria-expanded','true');
//                                     break;
//                             }
//                         }
//                     }, false);
//                 }
//             })
//         });
//     }
//     loadSearch('', true);
//     document.addEventListener('click', closeAllSelect);
//     $('.state-search__select__container input').on('input', function(e) {
//         loadSearch($(this).val());
//         const selectEls = $(this).parents('.state-search__select');
//         $(selectEls).addClass('select--active');
//     });
//     var locationInput = document.getElementById('locationautocomplete');
//     if (locationInput)
//         var autocomplete = new google.maps.places.Autocomplete(locationInput);
// })();