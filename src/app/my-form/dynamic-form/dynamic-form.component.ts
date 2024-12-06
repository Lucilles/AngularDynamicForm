import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrl: './dynamic-form.component.scss',

})
export class DynamicFormComponent  {
  @Input() jsonData: any = {};
  form!: FormGroup;
  constructor(private fb: FormBuilder) {}

  ngOnChanges() {
    this.form = this.createForm(this.jsonData, 1);
  }
  createForm(data: any, layer:number = 1): FormGroup {
    let group: any = {};
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        if (Array.isArray(data[key])) {
          if(['string', 'number'].includes(typeof data[key][0])){
            group[key] = this.fb.group({selectedValue: [], options:[data[key]] }); 
          }else{
            group[key] = this.fb.array(data[key].map((item:any) => this.createForm(item, layer++)));
          }
        } else if (typeof data[key] === 'object' && data[key] !== null) {
          group[key] = this.createForm(data[key], layer++);
        } else {
          group[key] = [data[key]];
        }
      }
    }
    return this.fb.group(group);
  }
  isNotDate(value:any) {
    if (typeof value !== 'string') {
      return true;
    }
    if (typeof value === 'string' && /^\d{5}(\d{4})?$/.test(value)) {
      return true;
    }
    const date = new Date(value);
    return isNaN(date.getTime());  // Returns true if not a valid date
  }
  getFormControls(form: FormGroup | FormArray, parentName?: string): any {
    if (form instanceof FormGroup) {
      const controls = Object.keys(form.controls);
      const newArray = controls.map((key:string, index)=>{
        const item:any= {
          name: key,
          data: form.controls[key],
          id: `${parentName}-${key}-${index}`,
          value: form.controls[key].value,
          type: !this.isNotDate(form.controls[key].value)?'date':typeof form.controls[key].value,
          isArray: Array.isArray(form.controls[key].value),
          isStringArray: form.controls[key].value?.options&&Array.isArray(form.controls[key].value.options)
        }
        if(item.isStringArray){
          item.options = form.controls[key].value.options
        }
        return item
      });
      return newArray
    }else if(form instanceof FormArray){
      return form.controls.map((item, index)=>{
        return {
          name: `${parentName} ${index+1}`,
          data: item,
          id: `${parentName}-${index}`,
          type: typeof form.value,
          isArrayItem:true
        }
      });
    }
    return null;
  }
  trackItem () {
    return this.form ? this.form : undefined;
  }

  onSubmit() {
    console.log(this.form.value);
  }
}
