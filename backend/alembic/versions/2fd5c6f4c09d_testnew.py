"""testnew

Revision ID: 2fd5c6f4c09d
Revises: da815314ddd1
Create Date: 2025-08-01 17:39:24.027057

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '2fd5c6f4c09d'
down_revision: Union[str, Sequence[str], None] = 'da815314ddd1'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    pass


def downgrade() -> None:
    """Downgrade schema."""
    pass
