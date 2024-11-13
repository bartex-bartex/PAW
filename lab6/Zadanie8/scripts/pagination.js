export class Pagination {
    constructor(elementsCnt, rowsPerPage = 15, startingPage = 1) {
        this.updatePagination(elementsCnt, rowsPerPage, startingPage);
    }
    
    updatePagination(elementsCnt, rowsPerPage = 15, startingPage = 1) {
        this.rowsPerPage = rowsPerPage;
        this.currentPage = startingPage;
        this.totalPages = Math.ceil(elementsCnt / rowsPerPage);
    }
    
    goToPreviousPage() {
        if (this.currentPage > 1) {
            this.currentPage--;
        }
        console.log(this.currentPage, this.totalPages); 
    }
    
    goToNextPage() {
        if (this.currentPage < this.totalPages) {
            this.currentPage++;
        }
        console.log(this.currentPage, this.totalPages); 
    }

    getCurrentPageIndexes() {
        const startIdx = (this.currentPage - 1) * this.rowsPerPage;
        const endIdx = startIdx + this.rowsPerPage;
        return { startIdx, endIdx };
    }
}
