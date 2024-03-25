class searchApi{
    constructor(query,queryStr){
        this.query=query
        this.queryStr=queryStr
    }
    search(){
        console.log(`search before ${this.queryStr.keyword}`)
        let keyword=this.queryStr.keyword?{
            name:{
                $regex:this.queryStr.keyword,
                $options:'i'
            }
            }:{};
            console.log(`search after ${keyword}`)
        this.query.find({...keyword})
        console.log(`search ${this}`)
    return this;
    }
    filter(){
        const queryStrCopy={ ...this.queryStr}

        const removeFields=['keywords','limit','page']
        removeFields.forEach(field=> delete queryStrCopy[field])

        let queryStr=JSON.stringify(queryStrCopy)
        queryStr=queryStr.replace(/\b(gt|lt|gte|lte)/g,match=>`$${match}`)
        this.query.find(JSON.parse(queryStr))
        return this
    }
    paginate(resPerPage){
        const currentPage=Number(this.queryStr.page)||1
        const skip=resPerPage*(currentPage-1)
        this.query.limit(resPerPage).skip(skip)
        return this
    }
}
module.exports=searchApi