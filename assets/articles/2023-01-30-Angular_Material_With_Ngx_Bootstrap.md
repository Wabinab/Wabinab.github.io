# Angular Material CSS clash with Ngx Bootstrap

The idea is not to use Angular Material theme and use bootstrap theme, otherwise they clash with each other. But how we build some of the stuffs? 

For example, **don't use mat-form-field**. Just use normal bootstrap field and do things the bootstrap way. The only advantage with `mat-form-field` is to use their css; and we're not using their css so don't worry, just replace with our normal form field and everything will be fine. 
