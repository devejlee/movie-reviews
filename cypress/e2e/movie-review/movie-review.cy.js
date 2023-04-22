import { initialData } from '../../../src/data'
import { setLocalStorageItem } from '../../../src/utils';

const LOCAL_STORAGE_KEY = 'movie-reviews';
const movies = initialData;

describe('Movie review app', () => {
  beforeEach(() => {
    setLocalStorageItem(LOCAL_STORAGE_KEY, movies);
    cy.visit('/');
  });

  it.only('should add a new movie review', () => {
    const newMovieTitle = 'The Shawshank Redemption';
    const newMovieComment = 'Classic movie, highly recommended';
    const newMovieScore = '4';
  
    cy.get('input[placeholder="Title of movie"]').type(newMovieTitle);
    cy.get('input[placeholder="Review of movie"]').type(newMovieComment);
    cy.get('[data-testid="dropdown-selected"]').click()
    cy.get('[data-testid="dropdown-menu"]').contains(newMovieScore).click()
    cy.contains('Submit').click();
  
    cy.get('[data-testid="review-card"]').should('have.length', movies.length + 1)
  
    cy.contains('[data-testid="review-card"] h4', newMovieTitle)
      .parent('[data-testid="review-card"]')
      .as('newReviewCard')
  
    cy.get('@newReviewCard').within(() => {
      cy.contains(newMovieTitle)
      cy.contains(newMovieComment);
      cy.get('[data-testid="circle"]').should('have.length', newMovieScore);
    });
  });
  
  // todo other tests

  it('should sort the movie list by score', () => {
    cy.contains('Sort by score').click();

    const sortedMovies = [...movies].sort((a, b) => b.score - a.score);
    cy.get('.movie-card').each(($card, index) => {
      cy.wrap($card).within(() => {
        cy.contains(sortedMovies[index].title);
        cy.contains(sortedMovies[index].comment);
        cy.contains(sortedMovies[index].score.toString());
      });
    });
  });

  it('should search for a movie by title', () => {
    const searchTerm = 'Shrek';
    const filteredMovies = movies.filter((movie) =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    cy.get('input[placeholder="Search movie title"]').type(searchTerm);

    cy.get('.movie-card')
      .should('have.length', filteredMovies.length)
      .each(($card, index) => {
        cy.wrap($card).within(() => {
          cy.contains(filteredMovies[index].title);
          cy.contains(filteredMovies[index].comment);
          cy.contains(filteredMovies[index].score.toString());
        });
      });
  });
});
