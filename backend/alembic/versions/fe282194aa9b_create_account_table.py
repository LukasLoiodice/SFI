"""create account table

Revision ID: fe282194aa9b
Revises: 2fd5c6f4c09d
Create Date: 2025-08-01 17:45:51.187862

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'fe282194aa9b'
down_revision: Union[str, Sequence[str], None] = '2fd5c6f4c09d'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    pass


def downgrade() -> None:
    """Downgrade schema."""
    pass
